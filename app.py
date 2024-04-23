from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://admin:root1234@ipm-try.c3mcsiqsmveo.us-east-2.rds.amazonaws.com/ipm'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = password
        
class Files(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    filename = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), nullable=False)

    def __init__(self, filename, username, user):
        self.filename = filename
        self.username = username
        self.user = user


class Experiment(db.Model):
    Experiment_ID = db.Column(db.Integer, primary_key=True)
    Experiment_Type = db.Column(db.String(255))
    Uploaded_by = db.Column(db.String(255))

    def __init__(self, Experiment_ID, Experiment_Type, Uploaded_by):
        self.Experiment_ID = Experiment_ID
        self.Experiment_Type = Experiment_Type
        self.Uploaded_by = Uploaded_by


class Sample(db.Model):
    Sample_ID = db.Column(db.String(255), primary_key=True)
    Experiment_ID = db.Column(db.Integer)
    Well = db.Column(db.String(10))
    Sample_Name = db.Column(db.String(255))
    Target_Name = db.Column(db.String(255))
    Target_Name_2 = db.Column(db.String(255))
    Target_amount = db.Column(db.Float)
    Target_amount_Unit = db.Column(db.String(255))
    Template = db.Column(db.String(255))
    Matrix = db.Column(db.String(255))
    primers = db.Column(db.String(255))
    Assay = db.Column(db.String(255))
    Tt_analysis = db.Column(db.String(255))
    Ct = db.Column(db.String(255))
    Ct_Mean = db.Column(db.String(255))
    Ct_SD = db.Column(db.String(255))
    Reporter = db.Column(db.String(255))

    def __init__(self, Sample_ID, Experiment_ID, Well, Sample_Name, Target_Name, Target_Name_2, Target_amount, Target_amount_Unit, Template ,Matrix, primers, Assay, Tt_analysis, Ct, Ct_Mean, Ct_SD, Reporter, experiment):
        self.Sample_ID = Sample_ID
        self.Experiment_ID = Experiment_ID
        self.Well = Well
        self.Sample_Name = Sample_Name
        self.Target_Name = Target_Name
        self.Target_Name_2 = Target_Name_2
        self.Target_amount = Target_amount
        self.Target_amount_Unit = Target_amount_Unit
        self.Template = Template
        self.Matrix = Matrix
        self.primers = primers
        self.Assay = Assay
        self.Tt_analysis = Tt_analysis
        self.Ct = Ct
        self.Ct_Mean = Ct_Mean
        self.Ct_SD = Ct_SD
        self.Reporter = Reporter
        self.experiment = experiment


class Data(db.Model):
    Data_ID = db.Column(db.String(255), primary_key=True)
    Experiment_ID = db.Column(db.Integer)
    Well = db.Column(db.String(10))
    Cycle = db.Column(db.Integer)
    FAM = db.Column(db.String(255))

    def __init__(self, Data_ID, Experiment_ID, Well, Cycle, FAM, experiment):
        self.Data_ID = Data_ID
        self.Experiment_ID = Experiment_ID
        self.Well = Well
        self.Cycle = Cycle
        self.FAM = FAM
        self.experiment = experiment


@app.route('/')
def index():
    return "hello World"


if __name__ == '__main__':
    app.run(debug=True)
