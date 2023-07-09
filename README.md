# Blog Project

This project is a simple blog application built using Material UI for the user interface. It utilizes a MySQL database to store blog data. Below are the instructions to get started with the project:

## Getting Started

1. Create a file named `settings.py` inside the `src/python_scripts` directory.
2. In the `settings.py` file, add the following line: `dbpass = "your_mysql_password"`. Replace `"your_mysql_password"` with your actual MySQL password.

## Setting up the Database

To set up the necessary database for the blog, follow these steps:

1. Run the following command in your terminal or command prompt to create a new database named `blog`:
   mysql -u your_username -p blog < blog_db.sql
   Replace `your_username` with your MySQL username and enter your password when prompted.

2. Import the `blog_db.sql` file into the `blog` database by running the following command:

Again, replace `your_username` with your MySQL username and enter your password when prompted.

## Testing Credentials

To access the website and perform testing, use the following credentials:

- Username: `test`
- Password: `123456`

## Accessing the Blog

You can access the blog by visiting the following URL in your web browser:

[http://ec2-3-127-35-158.eu-central-1.compute.amazonaws.com:5000/](http://ec2-3-127-35-158.eu-central-1.compute.amazonaws.com:5000/)

Please note that this URL may be subject to change or may not be accessible if the server is not running or if any other factors affect its availability.

If you have any further questions or need assistance with the blog project, please feel free to reach out. Enjoy blogging!
