import random
import psycopg2
from datetime import datetime
from flask import Flask, request, render_template, json, jsonify

conn = psycopg2.connect(database="dfgij02kdoon8v",
                        user="rmmtgdiwqpkzcx",
                        password="0ee1692a52f94cf94017974aac447d28fe1edf5acb611266773d5ec3fda3ee50",
                        host="ec2-3-224-157-224.compute-1.amazonaws.com",
                        port="5432")
if conn.closed == 0:
    print("Success connect to SQL")
    cur = conn.cursor()
else:
    print("Connet to the SQL server error")

app = Flask(__name__)

@app.route('/test')
def test():
    return render_template('index.html')
@app.route('/')
def hello_world():  # put application's code here
    return render_template('home.html')


@app.route('/insertDinner')
def insertDinner():
    return render_template('insert.html')


@app.route('/listAllDinner')
def ListallDinner():
    return render_template('list.html')


# list list do Doing Random
# check the time whether the time that user click the button fix in element's information.
# run random using the ID of elements that had been got.
# return the result's full information.
@app.route('/random')
def startRandom():
    ID = []
    element = {}
    today_week = datetime.today().isoweekday()
    count_element = 0
    cur.execute('SELECT * from "DinnerList"')
    IDs = cur.fetchall()
    for i in IDs:
        if i[today_week + 1]:
            element[count_element] = i
            count_element += 1
        ID.append(i[0])
    if not ID:
        return 'There is nothing in the SQL'
    elif not element:
        return "There is no store business today."
    else:
        result = random.randint(0, len(ID) - 1)
        return element[result][1]


# list list do input a dinner and it information  then add it into the SQL
# check whether it or not exited in the SQL(list).
# add what the user input into the SQL.
@app.route("/addData=<dinner>", methods=["POST"])
def add(dinner):
    dinnerName = "'" + dinner + "'"
    mon = (request.form.get("mon"))
    thes = (request.form.get('thes'))
    wed = (request.form.get("wed"))
    thr = (request.form.get("thr"))
    fri = (request.form.get("fri"))
    sat = (request.form.get("sat"))
    sun = (request.form.get("sun"))
    print(f"{type(mon)}{thes}{wed}{thr}{fri}{sat}{sun}")
    cur.execute('SELECT name FROM "DinnerList" WHERE name = {}'.format(dinnerName))
    check = cur.fetchall()
    if not check:
        if mon == 'false' and thes == "false" and wed == "false" and thr == "false" and fri == 'false' and sat == 'false' and sun == "false":
            return "Please select the week that the store you input is business."
        cur.execute(
            'INSERT INTO "DinnerList" (name, "Mon", "Tues", "Wed", "Tur", "Fri", "Sat", "Sun") values ({},{},{},{},{},{},{},{})'.format(
                dinnerName, mon, thes, wed, thr, fri, sat, sun))
        conn.commit()
        cur.execute('SELECT name FROM "DinnerList" WHERE name = {}'.format(dinnerName))
        element = cur.fetchall()
        if element[0][0] == dinner:
            return "success add"
        else:
            return "add ERROR"
    else:
        return "There store you input is exited in the list"


# list list do change dinner's information
# list list do delete dinner's information
# List all of the data in the SQL.
# search the element that the user choose
# update the element in the SQL
@app.route("/changeData/<ID>", methods=["POST", "DELETE"])
def change(ID):
    if request.method == "DELETE":
        cur.execute('DELETE from "DinnerList" where id={}'.format(ID))
        conn.commit()
    return "success"


# list list do list all elements in the SQL
@app.route('/listAll')
def ListAll():
    cur.execute('SELECT * from "DinnerList"')
    record = cur.fetchall()
    listData = []
    for i in record:
        json = {}
        id, name, Mon, Thes, Wed, Thr, Fri, Sat, Sun = i
        json["ID"] = id
        json["Name"] = name
        json["Mon"] = Mon
        json["Thes"] = Thes
        json["Wed"] = Wed
        json["Thr"] = Thr
        json["Fri"] = Fri
        json["Sat"] = Sat
        json["Sun"] = Sun
        listData.append(json)
    data = jsonify(listData)
    return data


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True, reload=True)
