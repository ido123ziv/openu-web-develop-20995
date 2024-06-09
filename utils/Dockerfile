FROM python:3.12.3-slim-bullseye
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
COPY src/ /app/
CMD [ "python3" "main.py" ]