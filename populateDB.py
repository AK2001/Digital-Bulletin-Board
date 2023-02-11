# Populates the Database with sample data

# Used to populate the database with sample data. We pass the db instance and the tables
# This function runs every time the flask application is run BUT only populates the data ONCE
def populate_database(db, User, Task):
    citizen = User(user_first_name="Sotiris", user_last_name="Poulis", user_email="sotiris@gmail.com",
                   user_pass="sotiris1@",
                   user_type="Citizen", user_tin=None)

    organization1 = User(user_first_name="Oi filoi tou dasous", user_last_name=None, user_email="dasofiloi@gmail.com",
                         user_pass="dasofiloi1@",
                         user_type="Organization", user_tin=648759135)

    organization2 = User(user_first_name="Chamogelo tou Politi", user_last_name=None,
                         user_email="chamogelotoupoliti@gmail.com", user_pass="chamogelo1@",
                         user_type="Organization", user_tin=256478915)

    # Check that user's do not already exist in DB
    if (db.session.query(User).filter_by(user_email=citizen.user_email).first() is not None) and \
            (db.session.query(User).filter_by(user_email=organization1.user_email).first() is not None) and\
            (db.session.query(User).filter_by(user_email=organization2.user_email).first() is not None):

        citizen = db.session.query(User).filter_by(user_email=citizen.user_email).first()
        organization1 = db.session.query(User).filter_by(user_email=organization1.user_email).first()
        organization2 = db.session.query(User).filter_by(user_email=organization2.user_email).first()
        pass
    else:
        db.session.add(citizen)
        db.session.add(organization1)
        db.session.add(organization2)
        db.session.commit()

    task1 = Task(task_title="Annual Tree planting at Mt. Imitos",
                 task_desc="Join us on our annual tree planting on Mt. Imitos at 20/2/2023",
                 task_type="Activity", task_goal=20, task_duration=40, task_state="Ongoing",
                 task_publisher_id=organization1.id, task_publisher_name=organization1.user_first_name)

    task2 = Task(task_title="Cleaning of streets after storm",
                 task_desc="Join us to clear the branches that fell to the streets of athens after yesterdays storm",
                 task_type="Activity", task_goal=15, task_duration=20, task_state="Ongoing",
                 task_publisher_id=organization1.id, task_publisher_name=organization1.user_first_name)

    task3 = Task(task_title="First aid products needed for hospital",
                 task_desc="Help us gather enough first aid products to donate to the hospital",
                 task_type="Activity", task_goal=100, task_duration=10, task_state="Ongoing",
                 task_publisher_id=organization2.id, task_publisher_name=organization2.user_first_name)

    # Check that task's do not already exist in DB
    if (db.session.query(Task).filter_by(task_title=task1.task_title).first() is not None) and \
            (db.session.query(Task).filter_by(task_title=task2.task_title).first() is not None) and \
            (db.session.query(Task).filter_by(task_title=task3.task_title).first() is not None):
        pass
    else:
        db.session.add(task1)
        db.session.add(task2)
        db.session.add(task3)

        citizen.tasks_contributed.append(task1)
        citizen.tasks_contributed.append(task2)

        organization1.tasks_contributed.append(task3)

        db.session.commit()

    print("Populated database with sample data")
    db.session.close()
