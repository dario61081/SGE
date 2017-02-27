import sys

reload(sys)
sys.setdefaultencoding("CP1252")

# config
host = '0.0.0.0'
port = 10000

from flask import Flask
from flask_menu import Menu
from flask_compress import Compress
from flask_socketio import SocketIO

from modulos.depositos import depositos

app = Flask(__name__)
app.jinja_env.cache = None
app.secret_key = '123456789'
menu = Menu(app=app)
compress = Compress(app=app)
socketio = SocketIO(app=app)

app.register_blueprint(depositos)


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    socketio.run(app=app, host=host, port=port, debug=True)


    # ngx ls
    # ngx enable <name>
    # ngx disable <name>
    # ngx new <name> [--path=<path>] [--template=<template>] [(--port=<port>)...]
    # ngx rm <name>
    # ngx open <name>
    # ngx cp <source> <target>
    # ngx --version
    # examples
    #
    # ngx new nodejs.test --template=node --port=3003 --port=3004
    # ngx new phpfpm.test --template=php --port=9000
    # service nginx reload
