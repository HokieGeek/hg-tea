FROM python:3

EXPOSE 8080

ADD . /

ENTRYPOINT ["python3", "-m", "http.server"]
CMD ["8080"]
