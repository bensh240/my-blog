import json
import smtplib
import uuid
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import bcrypt
import mysql.connector
import mysql.connector
import mysql.connector as mysql
import mysql.connector.pooling
import mysql.connector.pooling
from flask import Flask, jsonify, request, abort, make_response
from flask_cors import CORS

from setting import dbpwd, aws_db

# for local use
pool = mysql.connector.pooling.MySQLConnectionPool(
    host=aws_db,
    user="admin",
    passwd=dbpwd,
    database="blog",
    buffered=True,
    pool_size=5,
    pool_name="mypool"
)
# app = Flask(__name__)


## for deployment
app = Flask(__name__,
            static_folder='/home/ubuntu/build',
            static_url_path='/')


@app.route('/')
@app.route('/about')
@app.route('/NewPostPage')
@app.route('/postPage')
@app.route('/signup')
@app.route('/LoginPage')
def catch_all():
    return app.send_static_file("index.html")


@app.route('/chosenPost/<post_id>')
def index2(post_id):
    return app.send_static_file('index.html')


def generate_reset_link(email):
    # Generate a unique token for the password reset link
    token = str(uuid.uuid4())

    # Construct the password reset link using the token and email
    reset_link = f"https://example.com/reset-password?token={token}&email={email}"

    return reset_link


def convert_to_json(records, headers):
    data = []
    for row in records:
        data.append(dict(zip(headers, row)))
    return json.dumps(data)


def convert_to_json2(record, headers):
    row = list(record)
    row[5] = row[5].strftime("%Y-%m-%d %H:%M:%S")
    # record[4] = record[4].strftime("%Y-%m-%d %H:%M:%S")
    data = (dict(zip(headers, row)))

    # for row in records:
    #     if row is None:
    #         raise ValueError("Record is None")
    #     data.append(dict(zip(headers, row)))
    return json.dumps(data)


def add_session(session_id, user_id):
    query = "insert into sessions (session_id,user_id,created_at) values (%s,%s,NOW())"
    values = (session_id, user_id,)
    db = pool.get_connection()
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    return get_session(session_id)


def get_session(session_id):
    query = "select session_id,user_id from sessions where session_id = %s"
    values = (session_id,)
    db = pool.get_connection()
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    db.close()
    header = ['session_id', 'user_id']
    return dict(zip(header, record))


@app.route('/session', methods=['GET'])
def get_user_info():
    db = pool.get_connection()
    session_id = request.cookies.get("session_id")
    query = "SELECT users.username, users.email FROM users JOIN sessions ON users.id = sessions.user_id WHERE sessions.session_id = %s;"
    values = (session_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    db.close()

    if record is None:
        # Handle the case when there is no matching session
        return "No session found"

    header = ['username', 'email']
    user_info = dict(zip(header, record))
    return user_info


#
# def forgot_password():
#     data = request.get_json()
#     email = data.get('email')
#
#     # Generate a password reset link
#     reset_link = generate_reset_link(email)
#
#     # Send the password reset link to the user's email
#     send_reset_email(email, reset_link)
#
#     return jsonify({'message': 'Password reset link sent to your email'})
#
#
# def send_reset_email(email, reset_link):
#     msg = MIMEMultipart()
#     msg['From'] = 'bensh240@gmail.com'  # Enter your email
#     msg['To'] = email
#     msg['Subject'] = 'Reset Password'
#     message = f"""
#         Dear User,
#
#         Please click on the following link to reset your password:
#         {reset_link}
#
#         Best regards,
#         Your Team
#     """
#     msg.attach(MIMEText(message, 'plain'))
#
#     # Create server
#     server = smtplib.SMTP('smtp.gmail.com: 587')  # Use the appropriate server and port
#     server.starttls()
#
#     # Login credentials for sending the mail
#     password = "yourpassword"  # Enter your password
#     server.login(msg['From'], password)
#
#     # Send the message via the server
#     server.sendmail(msg['From'], msg['To'], msg.as_string())
#     server.quit()


def get_all_users():
    query = "select username, email,created_at, birth_date from users"
    db = pool.get_connection()
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    header = ['username', 'email', 'created_at', 'birth_date']
    data = []
    for r in records:
        row = list(r)
        row[2] = row[2].strftime("%Y-%m-%d %H:%M:%S")
        row[3] = row[3].strftime("%Y-%m-%d %H:%M:%S")
        data.append(dict(zip(header, row)))
    db.close()
    return json.dumps(data)


def add_users():
    data = request.get_json()
    db = pool.get_connection()

    if 'username' in data and 'email' in data and 'password' in data and 'birth_date' in data:
        cursor = db.cursor()

        try:
            # hash the password before saving
            hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

            query = "INSERT INTO users(username, email, password,created_at, birth_date) VALUES (%s, %s, %s,NOW(), %s)"
            values = (data['username'], data['email'], hashed_password, data['birth_date'])
            cursor.execute(query, values)
            db.commit()

            return {"message": "User added successfully!"}, 201
        except mysql.Error as err:
            return {"error": str(err)}, 400
        finally:
            cursor.close()
            db.close()
    else:
        return {"error": "Missing required fields."}, 400


def get_all_posts():
    query = "SELECT id, title, body, user_id, author, date_post, link_picture FROM posts"
    db = pool.get_connection()
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    db.close()
    header = ['id', 'title', 'body', 'user_id', 'author', 'date_post', 'link_picture']
    data = []
    for r in records:
        row = list(r)
        row[5] = row[5].strftime("%Y-%m-%d %H:%M:%S")
        data.append(dict(zip(header, row)))

    return jsonify(data)


@app.route('/posts/delete_or_update/<int:post_id>', methods=['DELETE', 'PUT'])
def delete_or_update(post_id):
    if request.method == 'PUT':
        return edit_post(post_id)
    elif request.method == 'DELETE':
        return delete_post(post_id)


# def edit_comment(comment_id, post_id):
#     user_id = check_login()
#     db = pool.get_connection()
#     if not user_id:
#         abort(401, 'Unauthorized. Please log in.')
#     cursor = db.cursor()
#     # Check if the post belongs to the logged-in user
#     query = "SELECT user_id FROM posts WHERE id = %s"
#     cursor.execute(query, (str(post_id),))
#     record = cursor.fetchone()
#
#     if not record or record[0] != user_id:
#         cursor.close()
#         abort(403, 'Forbidden. You can only delete your own posts.')
#     db = pool.get_connection()
#     data = request.get_json()
#     query = "update comment set body = %s where id = %s"
#     values = (data['body'], comment_id)
#     cursor = db.cursor()
#     cursor.execute(query, values)
#     db.commit()
#     cursor.close()
#     db.close()
#     return get_post_by_id(post_id)


# def delete_comment(comment_id, post_id):
#     db = pool.get_connection()
#     user_id = check_login()
#     if not user_id:
#         abort(401, 'Unauthorized. Please log in.')
#     cursor = db.cursor()
#     # Check if the post belongs to the logged-in user
#     query = "SELECT user_id FROM comments WHERE id = %s"
#     cursor.execute(query, (user_id,))
#     record = cursor.fetchone()
#
#     if not record or record[0] != user_id:
#         cursor.close()
#         abort(403, 'Forbidden. You can only delete your own comment.')
#
#     # Delete the post with the given post_id from the database
#     query = "DELETE FROM comments WHERE id = %s"
#     cursor.execute(query, (comment_id,))
#     db.commit()
#
#     cursor.close()
#     db.close()
#     return jsonify({'message': f'comment with ID {comment_id} deleted successfully'})


# @app.route('/comments/delete_or_update/<int:comment_id>', methods=['DELETE', 'PUT'])
# def delete_or_update_comment(comment_id, post_id):
#     if request.method == 'PUT':
#         return edit_comment(comment_id, post_id)
#     elif request.method == 'DELETE':
#         return delete_comment(comment_id, post_id)


def delete_post(post_id):
    db = pool.get_connection()
    user_id = check_login()
    if not user_id:
        abort(401, 'Unauthorized. Please log in.')

    cursor = db.cursor()

    # Check if the post belongs to the logged-in user
    query = "SELECT user_id FROM posts WHERE id = %s"
    cursor.execute(query, (post_id,))
    record = cursor.fetchone()

    if not record or record[0] != user_id:
        cursor.close()
        db.close()
        abort(403, 'Forbidden. You can only delete your own posts.')

    # Delete the comments associated with the post
    query = "DELETE FROM comments WHERE post_id = %s"
    cursor.execute(query, (post_id,))
    db.commit()

    # Delete the post with the given post_id from the database
    query = "DELETE FROM posts WHERE id = %s"
    cursor.execute(query, (post_id,))
    db.commit()

    cursor.close()
    db.close()
    return jsonify({'message': f'Post with ID {post_id} deleted successfully'})


def add_new_post():
    db = pool.get_connection()
    user_id = check_login()  # Retrieve the user ID after login verification
    data = request.get_json()
    cursor = db.cursor()

    try:
        # Retrieve the author's username from the users table
        author_query = "SELECT username FROM users WHERE id = %s"
        cursor.execute(author_query, (user_id,))
        author = cursor.fetchone()[0]
        print(author)

        query = "INSERT INTO posts (title, body, user_id, author, date_post, link_picture) VALUES (%s, %s, %s, %s, NOW(), %s)"
        values = (data['title'], data['body'], user_id, author, data['link_picture'])
        cursor.execute(query, values)
        db.commit()

        return {"message": "Post added successfully!"}, 201
    except mysql.Error as err:
        return {"error": str(err)}, 400
    finally:
        cursor.close()
        db.close()


@app.route('/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'GET':
        return get_all_users()
    elif request.method == 'POST':
        return add_users()


@app.route('/posts/<int:post_id>', methods=['GET'])
def get_post_by_id(post_id):
    db = pool.get_connection()
    cursor = db.cursor()
    try:
        query = "SELECT id, title, body, user_id, author, date_post, link_picture FROM posts WHERE id = %s"
        values = (post_id,)
        cursor.execute(query, values)
        result = cursor.fetchone()
        if result is None:
            cursor.close()
            db.close()
            raise ValueError(f"No post found with ID {post_id}")
        header = ['id', 'title', 'body', 'user_id', 'author', 'date_post', 'link_picture']
        return convert_to_json2(result, header)
    finally:
        cursor.close()
        db.close()


def edit_post(post_id):
    user_id = check_login()
    db = pool.get_connection()
    if not user_id:
        abort(401, 'Unauthorized. Please log in.')
    cursor = db.cursor()
    # Check if the post belongs to the logged-in user
    query = "SELECT user_id FROM posts WHERE id = %s"
    cursor.execute(query, (str(post_id),))
    record = cursor.fetchone()

    if not record or record[0] != user_id:
        cursor.close()
        db.close()
        abort(403, 'Forbidden. You can only delete your own posts.')
    db = pool.get_connection()
    data = request.get_json()
    query = "update posts set title = %s, body=%s, link_picture=%s, where id = %s"
    values = (data['title'], data['body'], data['link_picture'], str(post_id))
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    return get_post_by_id(post_id)


@app.route('/posts', methods=['GET', 'POST'])
def get_posts():
    if request.method == 'GET':
        return get_all_posts()
    elif request.method == 'POST':
        return add_new_post()


def get_comments(post_id):
    query = "SELECT post_id, user_id, body,comment_writer FROM comments WHERE post_id = %s"
    db = pool.get_connection()
    cursor = db.cursor()
    cursor.execute(query, (post_id,))
    records = cursor.fetchall()
    cursor.close()
    db.close()
    header = ['post_id', 'user_id', 'body', 'comment_writer']
    data = convert_to_json(records, header)
    return data


def add_comment(post_id):
    db = pool.get_connection()
    data = request.get_json()
    user_id = check_login()
    try:
        # Retrieve the user ID after login verification

        cursor = db.cursor()
        # Retrieve the username using the user_id
        query = "SELECT username FROM users WHERE id = %s"
        cursor.execute(query, (user_id,))
        result = cursor.fetchone()

        if result:
            username = result[0]
        else:
            return {"error": "User not found"}, 404

        query = "INSERT INTO comments (post_id, comment_writer, body, user_id, created_at) VALUES (%s, %s, %s, %s, NOW())"
        values = (post_id, username, data['body'], user_id)
        cursor.execute(query, values)
        db.commit()

        return {"message": "Comment added successfully!"}, 201
    except mysql.Error as err:
        return {"error": str(err)}, 400
    except Exception as e:
        return {"error": str(e)}, 500
    finally:
        cursor.close()
        db.close()


@app.route('/posts/<int:post_id>/comments', methods=['GET', 'POST'])
def handle_comments(post_id):
    if request.method == 'GET':
        return get_comments(post_id)
    elif request.method == 'POST':
        return add_comment(post_id)


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    db = pool.get_connection()
    query = "SELECT id, username, password FROM users WHERE username = %s"
    values = (data['user'],)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    db.close()

    if not record:
        abort(401, f"user {values[0]} was not found")

    user_id = record[0]
    hashed_pwd = record[2]

    if not bcrypt.checkpw(data['pass'].encode('utf-8'), hashed_pwd.encode('utf-8')):
        abort(401)

    header = ['id', 'username']
    # Generate a unique session ID
    session_id = str(uuid.uuid4())

    # Set the session ID as a cookie in the response
    response = make_response(convert_to_json([record], header))
    response.set_cookie(
        "session_id",
        value=session_id,
        path="/"
    )
    add_session(session_id, record[0])

    return response


def check_login():
    db = pool.get_connection()
    session_id = request.cookies.get("session_id")
    if not session_id:
        abort(401, 'Unauthorized. Please log in.')
    query = "select user_id from sessions where session_id = %s"
    values = (session_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    db.close()
    if not record:
        abort(401, 'Unauthorized. Invalid session.')

    return record[0]  # return user_id


@app.route('/logout', methods=['POST'])
def logout():
    db = pool.get_connection()
    session_id = request.cookies.get("session_id")
    query = "delete from sessions where session_id = %s"
    values = (session_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    db.close()
    resp = make_response("user logout")
    resp.delete_cookie("session_id")
    return resp


if __name__ == "__main__":
    app.run(debug="true", port=5000)
