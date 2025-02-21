# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file and install dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY backend/app.py ./

# Expose the port your Flask app runs on
EXPOSE 5000

# Run the Flask application
CMD ["python", "app.py"]