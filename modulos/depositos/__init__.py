from flask import *
from flask_menu import register_menu

depositos = Blueprint('depositos', __name__, url_prefix='/depositos')


@register_menu(depositos, '.depositos', 'Depositos')
@depositos.route('/', methods=['GET'])
def home():
    return render_template('depositos_home.html')