from __future__ import annotations

from datetime import datetime
from datetime import timedelta
from datetime import timezone

from flask import Flask
from flask import jsonify
from flask import request

from hmac import compare_digest

from flask_jwt_extended import create_access_token
from flask_jwt_extended import current_user
from flask_jwt_extended import get_jwt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

from config import Config
import json

# Initializing flask app
app = Flask(__name__)

# Configuring flask app
app.config.from_object(Config)

# Creating app extensions
jwt = JWTManager(app)
db = SQLAlchemy(app)


# Helper function to deserialize datetime object into string form for JSON processing
def datetime_to_json(value):
    if value is None:
        return None
    return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]


# Database relation TABLE between Users and Task- Many-to-many
# I.e., a user can contribute to many tasks and a task can be contributed by many users
user_task_contributions = db.Table(
    "user_task_contributions",
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("task_id", db.Integer, db.ForeignKey("tasks.id"), primary_key=True),
)


# Database relation MODEL for Users
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_first_name = db.Column(db.String, nullable=False)
    user_last_name = db.Column(db.String, nullable=True)
    user_email = db.Column(db.String, unique=True, nullable=False)
    user_pass = db.Column(db.String, nullable=False)
    user_type = db.Column(db.String, nullable=False)
    user_tin = db.Column(db.String, unique=True)

    tasks_contributed = db.relationship("Task", secondary=user_task_contributions, backref="users_contributed")

    def check_password(self, password):
        return compare_digest(password, self.user_pass)

    def __repr__(self):
        return f'<User "{self.id}", {self.user_email}, {self.user_type}>'


# Database relation MODEL for Tasks
class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    task_title = db.Column(db.String, nullable=False)
    task_desc = db.Column(db.String, nullable=False)
    task_type = db.Column(db.String, nullable=False)
    task_goal = db.Column(db.Integer, nullable=False)
    task_duration = db.Column(db.Integer, nullable=False)
    task_state = db.Column(db.String, nullable=False)
    task_publisher_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    task_publisher_name = db.Column(db.String, nullable=False)
    task_date_created = db.Column(db.DateTime, default=datetime.now(), nullable=False)

    def as_json(self):
        """Return object data in easily serializable format"""
        return {
            'id': self.id,
            'taskTitle': self.task_title,
            'taskDesc': self.task_desc,
            'taskType': self.task_type,
            'taskGoal': self.task_goal,
            'taskDuration': self.task_duration,
            'taskState': self.task_state,
            'taskPublisherId': self.task_publisher_id,
            'taskPublisherName': self.task_publisher_name,
            'taskDateCreated': datetime_to_json(self.task_date_created)
        }

    def __repr__(self):
        return f'<Task "{self.id}", {self.task_title}, {self.task_state}>'


# Database relation MODEL for donation centers
class DonationCenter(db.Model):
    __tablename__ = 'dcenters'

    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'), nullable=False, primary_key=True)
    center_address = db.Column(db.String, nullable=False, primary_key=True)
    center_zip = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<D Center "{self.id}", {self.center_address}, {self.center_zip}>'


# Register a callback function that takes whatever object is passed in as the
# identity when creating JWTs and converts it to a JSON serializable format.
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


# Register a callback function that loads a user from your database whenever
# a protected route is accessed. This should return any python object on a
# successful lookup, or None if the lookup failed for any reason (for example
# if the user has been deleted from the database).
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()


# Refreshing the token lifespan after a specified time limit
# Decorator ensures that the function runs after a request has been made
# to the respective protected API (check for decorator @jwt_required())
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=45))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=current_user)
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response


# Route for user signup
# Upon signup the following data are send via POST api call
# name: User's name
# last-name: User's last name (APPLICABLE ONLY FOR 'CITIZEN' USERS)
# email: User's email
# password: User's password
# user_type: The type of user (Citizen or Organization, this defines their roles
# tin: The user's TIN (APPLICABLE ONLY FOR 'ORGANIZATION' USERS)
@app.route("/api/signup", methods=["POST"])
def signup():
    response = jsonify({"msg": "signup successful"})
    user_type = request.json.get("userType", None)

    if user_type is None:
        return jsonify({"msg": "signup unsuccessful"})

    if user_type == "Citizen":
        name = request.json.get("userFirstName", None)
        last_name = request.json.get("userLastName", None)
        email = request.json.get("userEmail", None)
        password = request.json.get("userPass", None)
        tin = None

    else:
        name = request.json.get("organizationName", None)
        email = request.json.get("organizationEmail", None)
        password = request.json.get("organizationPass", None)
        tin = request.json.get("organizationTIN", None)
        last_name = None

    user = User(user_first_name=name, user_last_name=last_name, user_email=email, user_pass=password,
                user_type=user_type, user_tin=tin)

    try:
        db.session.add(user)
        db.session.commit()
        return response
    except IntegrityError as i:
        print(i)
        return jsonify({"msg": "Email already in use"}), 400
    except Exception as e:
        print(e)

    db.session.close()


# Route to authenticate users and return the JWT token in form of HTTP-only cookie.
# The create_access_token() function is used to actually generate the JWT upon successful login.
@app.route("/api/token", methods=["POST"])
def login():
    response = jsonify({"msg": "login successful"})
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = db.one_or_404(
        db.select(User).filter_by(user_email=email, user_pass=password),
        description=f"Wrong user credentials - User with email: {email}")

    access_token = create_access_token(identity=user)
    response = jsonify({"msg": "login successful", "access_token": access_token})

    set_access_cookies(response, access_token)
    return response


# Route used to log out a user from the system
@app.route("/api/logout")
@jwt_required()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


# Route used to return the current user's data
@app.route('/profile')
@jwt_required()
def my_profile():
    # We can now access our sqlalchemy User object via `current_user`.
    return jsonify(
        id=current_user.id,
        first_name=current_user.user_first_name,
        last_name=current_user.user_last_name,
        user_email=current_user.user_email,
        user_pass=current_user.user_pass,
        user_tin=current_user.user_tin,
        user_type=current_user.user_type,
    )


# Route used to create a task given the following variables
# title: Task title
# description: Task description
# task_type: The type of task (Activity or Donation)
# goal: The goal of a task
# duration: The duration for the task, i.e. 6 days
# state: The state of the task (Ongoing, Completed, Achieved)
@app.route("/api/createTask", methods=["POST"])
@jwt_required()
def create_task():
    user_type = current_user.user_type

    if user_type == "Citizen":
        return jsonify({"msg": "Users of type 'Citizen' are cannot create tasks"}), 401

    title = request.json.get("taskTitle", None)
    description = request.json.get("taskDescription", None)
    task_type = request.json.get("taskType", None)
    goal = request.json.get("taskGoal", None)
    duration = request.json.get("taskDuration", None)
    state = request.json.get("taskState", None)
    publisher_id = current_user.id
    publisher_name = current_user.user_first_name

    try:

        task = Task(task_title=title, task_desc=description, task_type=task_type, task_goal=goal,
                    task_duration=duration,
                    task_state=state, task_publisher_id=publisher_id, task_publisher_name=publisher_name)

        db.session.add(task)
        db.session.commit()
        db.session.close()

        return jsonify({"msg": "Task added"}), 200
    except Exception as e:
        print(e)
        return jsonify({"msg": "Server Error: Cannot create task"}), 500


# Route used to delete a specific task by providing its ID
@app.route("/api/deleteTask/<int:task_id>")
@jwt_required()
def delete_task(task_id):
    if current_user.user_type == "Citizen":
        return jsonify({"msg": "Authorized access for user type 'Citizen"}), 401

    task = db.one_or_404(
        db.select(Task).filter_by(id=task_id, task_publisher_id=current_user.id),
        description=f"Task with id={task_id} does not exist.")

    try:
        db.session.delete(task)
        db.session.commit()
        db.session.close()

        return jsonify({"msg": "Task removed"}), 200
    except Exception as e:
        print(e)
        return jsonify({"msg": "Server Error: Cannot remove task"}), 500


# Route to query all the tasks that exist in the system
@app.route("/api/getTasks")
def return_tasks():
    tasks = db.session.query(Task).all()

    return jsonify(all_tasks=[task.as_json() for task in tasks])


# Route to query a specific task based on its ID
@app.route("/api/getTask/<int:task_id>")
def return_specific_task(task_id):
    task = db.one_or_404(
        db.select(Task).filter_by(id=task_id),
        description=f"Task with id={task_id} does not exist.")

    task_contributions = db.session.query(user_task_contributions).filter_by(task_id=task_id).all()
    response = task.as_json()
    response["totalContributions"] = len(task_contributions)

    return response


# Route to query all the tasks that have been created by the user
@app.route("/api/getOwnTasks")
@jwt_required()
def return_own_tasks():
    if current_user.user_type == "Citizen":
        return jsonify({"msg": "Authorized access for user type 'Citizen"}), 401

    tasks = db.session.query(Task).filter_by(task_publisher_id=current_user.id).all()

    return jsonify(all_tasks=[task.as_json() for task in tasks])


# Route to query all the tasks that the user has contributed to
@app.route("/api/getTasksByUser")
@jwt_required()
def return_tasks_by_user():
    tasks = current_user.tasks_contributed

    return jsonify(all_tasks=[task.as_json() for task in tasks])


# Route used to contribute to a specific task
@app.route("/api/contributeToTask/<int:task_id>")
@jwt_required()
def contribute_to_task(task_id):
    task = db.one_or_404(
        db.select(Task).filter_by(id=task_id),
        description=f"Task with id={task_id} does not exist.")

    if task in current_user.tasks_contributed:
        print("it is")

    if task.task_state != "Ongoing":
        return jsonify({"msg": "Cannot contribute to a task that is Completed or Achieved"}), 400

    try:
        current_user.tasks_contributed.append(task)

        db.session.commit()
        db.session.close()

        return jsonify({"msg": "Contributed to task"}), 200
    except Exception as e:
        print(e)
        return jsonify({"msg": "Server Error: Cannot contribute to task"}), 500


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity

    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


# Returns 200 (OK) if user is validated else 401
@app.route("/api/checkToken", methods=["GET"])
@jwt_required()
def check_token_validity():
    return json.dumps({'success': True}), 200, {'ContentType': 'application/json'}


# Used to create the Database schema
with app.app_context():
    db.create_all()

# Running app
if __name__ == '__main__':
    app.run(debug=True)
