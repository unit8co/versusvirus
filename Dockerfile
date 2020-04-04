FROM python:3.7
COPY backend/requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt
COPY . /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8080
CMD ["python", "backend/app.py"]
