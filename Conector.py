from sqlalchemy import *

class conector:

    host = 'localhost'
    port = '3056'
    database = 'sge'

    def __init__(self, username="sysdba", userpass="masterkey"):
        self.url = 'firebird+fdb://{}:{}@{}:{}/{}'.format(username,userpass, self.host, self.port, self.database)
        self.engine = create_engine(self.url)
        self.metadata = MetaData(bind=self.engine)
        self.metadata.reflect(bind=self.engine, views=True)
        self.con = self.engine.connect()
        print 'Conectado'





if __name__ == '__main__':
    c = conector()