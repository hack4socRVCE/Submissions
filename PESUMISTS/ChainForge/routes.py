import web3
from flask import Flask
from web3.exceptions import BadFunctionCallOutput
from web3.contract import Contract
from web3 import Web3
from web3 import Account
# from eth_account import Account
from flask import render_template, url_for, flash, redirect, request
from ChainForge import app, db, bcrypt, mail
import ast
from ChainForge.compare_images import main as compare_images
from ChainForge.add_watermark import add_watermark

# forms
from ChainForge.forms import (
    RegistrationForm,
    LoginForm,
    UpdateAccountForm,
    ArtAddForm,
    OrderAddForm,
    OrderAcceptForm,
    DisputeForm,
)
# for database
from ChainForge.models import User, Art, Order

# login manager
from flask_login import login_user, current_user, logout_user, login_required


# for images
from PIL import Image

# to send email
from flask_mail import Message


# mish
import secrets
import os
import requests


w3 = Web3(Web3.HTTPProvider("HTTP://localhost:7545"))
assert True is w3.is_connected()
# Load the contract bytecode and ABI from files
with open("Chainforge/cbi.bin", "r") as f:
    bytecode = f.read()
with open("Chainforge/contract.abi", "r") as f:
    abi = f.read()



# # Create the contract in Python
# contract = w3.eth.contract(abi=abi, bytecode=bytecode)

# # Submit the transaction that deploys the contract
# tx_hash = contract.constructor().transact({'from':w3.eth.accounts[0] })

# # Wait for the transaction to be mined, and get the transaction receipt
# tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

# print(f"Contract Deployed At: {tx_receipt.contractAddress}")



# from web3.auto import w3
contract_mi = w3.eth.contract(
    abi=abi, bytecode=bytecode, address="0x1C5Fd8e7a2D0adf27074f2f7D7BEDFfb6eaa3564"
)

# # private_keys = {
# #     1: "0x92d3b05f0707f7d13f42258111e76a4640091275c7a9ff20252eb950fe1963e8",
# #     2: "0x7bd788915a3849258e17f9cb1d01c8c4a3f0739626569c90de9c0f1283515cc0",
# #     3: "0xe055d654cca755b2f0dc6d7320ce4c5a5b1d98423e091747f5ce689b6d87c76a",
# # }
# private_keys = {
#     0: "0x92d3b05f0707f7d13f42258111e76a4640091275c7a9ff20252eb950fe1963e8",
# }
acc = w3.eth.accounts
private_keys=dict()


Account.enable_unaudited_hdwallet_features()

mnemonic_phrase = "keen inquiry empty impose tourist grit ivory control reunion filter hello nothing"

accounts = w3.eth.accounts
for i in range(len(accounts)):
    path = f"m/44'/60'/0'/0/{i}"
    account = Account.from_mnemonic(mnemonic_phrase, account_path=path)
    private_key = account._private_key.hex()
    private_keys[i+1]=private_key
    public_address = account.address

    print(f"Account {i}:")
    print(f"Private key: {private_key}")    
    print(f"Public address: {public_address}")






print(private_keys)
with app.app_context():
    db.create_all()
# @app.before_first_request
# def create_tables():
#     db.create_all()


@app.route("/")
@app.route("/home")
def home():
    # for i in Art.query.all():
    #     db.session.delete(i)
    #     db.session.commit()
    # for i in User.query.all():
    #     db.session.delete(i)
    #     db.session.commit()
    # for i in Order.query.all():
    #     db.session.delete(i)
    #     db.session.commit()
    # print(Order.query.all())
    # print(Art.query.all())

    # print(User.query.all())
    return render_template("home.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    print(User.query.all())
    user = User.query.filter_by(id=2).first()
    print(user)
    if current_user.is_authenticated:
        return redirect(url_for("home"))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode(
            "utf-8"
        )

        user = User(
            username=form.username.data, email=form.email.data, password=hashed_password
        )
        db.session.add(user)
        db.session.commit()
        # private_keys[i]=web3.eth.account.create().privateKey.hex()
        # print(i,private_keys[i])
        account = Account.from_key(private_keys[User.query.all()[-1].id])
        nonce = w3.eth.get_transaction_count(account.address)
        transaction = contract_mi.functions.register(
            form.username.data
        ).build_transaction(
            {
                "from": account.address,
                "gas": 672197,
                "gasPrice": 20000000000,
                "nonce": nonce,
            }
        )
        signed_txn = account.sign_transaction(transaction)
        tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        print(receipt)
        # print(User.query.order_by.id.desc().first().id)

        # gas = w3.eth.estimateGas(transaction)

        # # Set the gas limit to slightly above the estimated gas value
        #     gas_limit = int(gas * 1.1)

        #     # Set the gas price to slightly above the current median gas price
        #     gas_price = w3.toWei('60', 'gwei')

        #     # Add the gas limit and gas price to the transaction
        #     transaction['gas'] = gas_limit
        #     transaction['gasPrice'] = gas_price

        flash("Your account has been created! You are now able to log in", "success")
        return redirect(url_for("login"))

    return render_template("register.html", title="Register", form=form, ru=None)


@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("home"))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get("next")
            return redirect(next_page) if next_page else redirect(url_for("home"))
        else:
            flash("Login Unsuccessful. Please check email and password", "danger")

    return render_template("login.html", title="Login", form=form, ru=None)


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for("home"))


def profile_picture(form_picture):
    random_hex = secrets.token_hex(8)
    # returns filename and extension filename not needed so
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, "static/profile_pics", picture_fn)

    # to resize
    output_size = (125, 125)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn


@app.route("/account", methods=["GET", "POST"])
@login_required
def account():
    form = UpdateAccountForm()
    if form.validate_on_submit():
        print(User.query.all())
        if form.picture.data:
            picture_file = profile_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash("Your account has been updated!", "success")
        return redirect(url_for("account"))
    elif request.method == "GET":
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for("static", filename="profile_pics/" + current_user.image_file)
    return render_template(
        "account.html", title="Account", image_file=image_file, form=form
    )


def save_picture(form_picture):
    random_hex = secrets.token_hex(8)
    # returns filename and extension filename not needed so
    _, f_ext = os.path.splitext(form_picture.filename)
    picture_fn = random_hex + f_ext
    picture_path = os.path.join(app.root_path, "static/profile_pics", picture_fn)

    # to resize

    output_size = (600, 400)
    i = Image.open(form_picture)
    i.thumbnail(output_size)
    i.save(picture_path)

    return picture_fn


@app.route("/portfolio", methods=["GET", "POST"])
@login_required
def portfolio():
    form = ArtAddForm()

    user = User.query.filter_by(username=current_user.username).first_or_404()

    data = Art.query.filter_by(user_id=user.id)

    if form.submit.data:
        if form.image.data:
            path="ChainForge/static/profile_pics/"
            picture_file = save_picture(form.image.data)
            print(picture_file)
            
            art = Art(
                # id=contract_mi.functions.projectCount().call()+1,
                 
                title=form.title.data,
                price=form.price.data,
                description=form.description.data,
                image_file=picture_file,
                user_id=current_user.id,
            )
            db.session.add(art)
            db.session.commit()
            add_watermark(path+picture_file)
            flash("Art Added", "success")
            return redirect(url_for("portfolio"))

    elif request.method == "POST":
        print(request.form.get("update"))
        id = request.form.get("id")
        if request.form.get("delete") == "delete":
            art = Art.query.filter_by(id=id).first()
            db.session.delete(art)
            db.session.commit()

        else:
            art = Art.query.filter_by(id=id).first()
            art.market = True
            account = Account.from_key(private_keys[current_user.id])
            nonce = w3.eth.get_transaction_count(account.address)
            transaction = contract_mi.functions.createProject(
                art.title, art.description, art.price
            ).build_transaction(
                {
                    "from": account.address,
                    "gas": 6721975,
                    "gasPrice": 20000000000,
                    "nonce": nonce,
                }
            )
            signed_txn = account.sign_transaction(transaction)

            # Send the signed transaction to the network
            

            try:
                tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
                print(f"Transaction sent: {tx_hash.hex()}")

                # Wait for the transaction to be mined
                tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
                print(f"Transaction receipt: {tx_receipt}")

                # Assuming the event `ProjectCreated` is emitted, let's try to decode it
                # Th is requires knowing the event signature and data structure
                logs = contract_mi.events.ProjectCreated().process_receipt(tx_receipt)
                print(logs)
                if art.b_id==None:
                    art.b_id=logs[0].args.id

                # for log in logs:
                #     print(f"Project created with ID: {log.args.projectId}")
                #     print(f"Project Name: {log.args.name}, Description: {log.args.description}, Price: {log.args.price}")

            except ValueError as e:
                # Handle errors, e.g., revert reasons
                print(f"Transaction failed: {e}")
            # print(art)
            db.session.commit()

    elif request.method == "GET":
        data = Art.query.filter_by(user_id=user.id)

    return render_template("portfolio.html", title="portfolio", form=form, data=data)


@app.route("/marketplace", methods=["GET", "POST"])
@login_required
def marketplace():
    data = Art.query.filter_by(market=True)

    if request.method == "POST":
        id = request.form.get("id")
        account = Account.from_key(private_keys[current_user.id])
        nonce = w3.eth.get_transaction_count(account.address)
        art = Art.query.filter_by(id=id).first_or_404()


        # Purchase
        transaction = contract_mi.functions.purchaseProject(int(id)).build_transaction(
            {
                "from": account.address,
                "value": int(art.price*(10**18)),
                "gas": 6721975,
                "gasPrice": 20000000000,
                "nonce": nonce,
            }
        )
        ####
        signed_txn = account.sign_transaction(transaction)
        try:
                tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
                print(f"Transaction sent: {tx_hash.hex()}")

                # Wait for the transaction to be mined
                tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
                print(f"Transaction receipt: {tx_receipt}")

                # Assuming the event `ProjectCreated` is emitted, let's try to decode it
                # Th is requires knowing the event signature and data structure
                logs = contract_mi.events.ProjectPurchased().process_receipt(tx_receipt)
                print(logs)

                
                

                art.user_id = current_user.id

                art.market = False
                # for log in logs:
                #     print(f"Project created with ID: {log.args.projectId}")
                #     print(f"Project Name: {log.args.name}, Description: {log.args.description}, Price: {log.args.price}")

        except ValueError as e:
                
                msg=ast.literal_eval(str(e))
                # Handle errors, e.g., revert reasons
                print(f"Transaction failed: {msg}")
                flash(f"Transaction failed: {msg['message']}","danger")

        ####
        

        # # Send the signed transaction to the network
        # tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)

        # # Wait for the transaction to be mined
        # receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        # # Print the transaction receipt
        # print(receipt)

        db.session.commit()

        return redirect(url_for("marketplace"))
    elif request.method == "GET":
        data = Art.query.filter_by(market=True)
        # print(str(data))
        for i in range(data.count()):
             data[i].image_file=data[i].image_file.split(".")[0]+"_watermarked."+data[i].image_file.split(".")[1]
    return render_template("marketplace.html", title="marketplace", data=data)


@app.route("/send", methods=["GET", "POST"])
@login_required
def send_order():
    form = OrderAddForm()
    if form.validate_on_submit():
        account = Account.from_key(private_keys[current_user.id])

        nonce = w3.eth.get_transaction_count(account.address)

        # Purchase
        rec_account = Account.from_key(private_keys[form.artist.data])

        transaction = contract_mi.functions.createOrder(
            form.title.data,
            rec_account.address,
            0,
            int(int(form.price.data)*(10**18)),
            form.description.data,
        ).build_transaction(
            {
                "from": account.address,
                "value": int(int(form.price.data)*(10**18)),
                "gas": 6721975,
                "gasPrice": 20000000000,
                "nonce": nonce,
                
            }
        )
        signed_txn = account.sign_transaction(transaction)
        try:
            tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            print(f"Transaction sent: {tx_hash.hex()}")

            # Wait for the transaction to be mined
            tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
            print(f"Transaction receipt: {tx_receipt}")

            # Assuming the event `ProjectCreated` is emitted, let's try to decode it
            # Th is requires knowing the event signature and data structure
            logs = tx_receipt #contract_mi.events
            print(logs)
        # for log in logs:
        #     print(f"Project created with ID: {log.args.projectId}")
        #     print(f"Project Name: {log.args.name}, Description: {log.args.description}, Price: {log.args.price}")

        except ValueError as e:
                # Handle errors, e.g., revert reasons
                print(f"Transaction failed: {e}")
                flash(f"Transaction failed: {e}","danger")

        # # Send the signed transaction to the network
        # tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
        
        # # Wait for the transaction to be mined
        # receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

        # # Print the transaction receipt
        # print(receipt)
        order = Order(
            title=form.title.data,
            description=form.description.data,
            price=form.price.data,
            req_id=current_user.id,
            art_id=form.artist.data,
        )
        db.session.add(order)
        db.session.commit()

        flash("Order sent", "success")
        return redirect(url_for("send_order"))
    return render_template("send_order.html", title="send_order", form=form)


@app.route("/receive_order", methods=["GET", "POST"])
@login_required
def receive_order():
    form = OrderAcceptForm()
    data = Order.query.filter_by(art_id=current_user.id)
    if form.submit.data and form.validate_on_submit():
        id = request.form.get("id")
        if form.image.data:
            order = Order.query.filter_by(id=id).first()
            picture_file = save_picture(form.image.data)
            art = Art(
                title=order.title,
                price=order.price,
                description=order.description,
                image_file=picture_file,
                user_id=order.req_id,
            )
            ######
            account = Account.from_key(private_keys[current_user.id])

            nonce = w3.eth.get_transaction_count(account.address)

            # Purchase
            # rec_account = Account.from_key(private_keys[form.artist.data])

            transaction = contract_mi.functions.SubmitOrder(
                int(id)
            ).build_transaction(
                {
                    "from": account.address,
                    # "value": int(int(form.price.data)*(10**18)),
                    "gas": 6721975,
                    "gasPrice": 20000000000,
                    "nonce": nonce,
                }
            )
            signed_txn = account.sign_transaction(transaction)
            try:
                    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
                    print(f"Transaction sent: {tx_hash.hex()}")

                    # Wait for the transaction to be mined
                    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
                    print(f"Transaction receipt: {tx_receipt}")

                    # Assuming the event `ProjectCreated` is emitted, let's try to decode it
                    # Th is requires knowing the event signature and data structure
                    logs = contract_mi.events.SentForApproval().process_receipt(tx_receipt)
                    print(logs.args)
                # for log in logs:
                #     print(f"Project created with ID: {log.args.projectId}")
                #     print(f"Project Name: {log.args.name}, Description: {log.args.description}, Price: {log.args.price}")

            except ValueError as e:
                    # Handle errors, e.g., revert reasons
                    print(f"Transaction failed: {e}")

            # Send the signed transaction to the network
            # tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)

            # # Wait for the transaction to be mined
            # receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

            # # Print the transaction receipt
            # print(receipt)
            db.session.add(art)
            db.session.delete(order)
            db.session.commit()
            flash("Art Added", "success")
            return redirect(url_for("receive_order"))
        else:
            flash("No image selected", "danger")
            return redirect(url_for("receive_order"))
    elif request.method == "POST":
        id = request.form.get("id")
        
        

        ######
        if request.form.get("delete") == "delete":
            order = Order.query.filter_by(id=id).first_or_404()
            db.session.delete(order)
            db.session.commit()
    else:
        data = Order.query.filter_by(art_id=current_user.id)

    return render_template(
        "receive_order.html", title="receive_order", data=data, form=form
    )


@app.route("/dispute", methods=["GET", "POST"])
@login_required
def dispute():
    form = DisputeForm()
    

    if form.validate():
        your = form.your_id.data
        their = form.their_id.data

        their_art = Art.query.filter_by(id=their).first()

        your_art = Art.query.filter_by(id=your).first()

        if not their_art:
             flash("Enter valid project id of other party","danger")
             return redirect(url_for("dispute"))
        if not your_art:
             flash("Enter your valid project id ","danger")
             return redirect(url_for("dispute"))
             

        their_image=their_art.image_file
        your_image=your_art.image_file

        path = "ChainForge/static/profile_pics/"
        print(your_image,their_image)
        similarity_index=compare_images(path+your_image,path+their_image)

        if similarity_index<=70:
             flash(f"Dispute Resolve similarity:{similarity_index} is < 70%", "danger")
             return redirect(url_for("dispute"))
             





        account = Account.from_key(private_keys[current_user.id])

        nonce = w3.eth.get_transaction_count(account.address)

        # Purchase
        # rec_account = Account.from_key(private_keys[form.artist.data])

        transaction = contract_mi.functions.copyrightClaim(
            int(your ),int(their)
        ).build_transaction(
            {
                "from": account.address,
                # "value": int(int(form.price.data)*(10**18)),
                "gas": 6721975,
                "gasPrice": 20000000000,
                "nonce": nonce,
            }
        )
        signed_txn = account.sign_transaction(transaction)
        try:
                tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
                print(f"Transaction sent: {tx_hash.hex()}")

                # Wait for the transaction to be mined
                tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
                print(f"Transaction receipt: {tx_receipt}")

                # Assuming the event `ProjectCreated` is emitted, let's try to decode it
                # Th is requires knowing the event signature and data structure
                logs = contract_mi.events.copyrightProtected().process_receipt(tx_receipt)
                print(logs)

                if your_art.b_id < their_art.b_id:
                    db.session.delete(their_art)
                    db.session.commit()
                    flash(f"Dispute Resolve similarity:{similarity_index}", "success")
                    flash(f"Their post got deleted", "success")
                else:
                    db.session.delete(your_art)
                    db.session.commit()
                    flash(f"Dispute Resolve similarity:{similarity_index}", "success")
                    flash(f"Your post got deleted as if was uploaded later", "danger")
            # for log in logs:
            #     print(f"Project created with ID: {log.args.projectId}")
            #     print(f"Project Name: {log.args.name}, Description: {log.args.description}, Price: {log.args.price}")

        except ValueError as e:
                # Handle errors, e.g., revert reasons
                msg=ast.literal_eval(str(e))
                # Handle errors, e.g., revert reasons
                print(f"Transaction failed: {msg}")
                flash(f"Transaction failed: {msg['message']}","danger")
                


        
        
        return redirect(url_for("dispute"))

    return render_template("dispute.html", title="dispute", form=form)


# def send_reset_email(user):
#     token = user.get_reset_token()
#     msg = Message('Password Reset Request',sender='noreply@demo.com',recipients=[user.email])
#     msg.body = f'''To reset your password, visit the following link:
# {url_for('reset_token', token=token, _external=True)}
# If you did not make this request then simply ignore this email and no changes will be made.
# '''
#     mail.send(msg)


# @app.route("/reset_password", methods=['GET', 'POST'])
# def reset_request():
#     if current_user.is_authenticated:
#         return redirect(url_for('home'))
#     form = RequestResetForm()
#     if form.validate_on_submit():
#         user = User.query.filter_by(email=form.email.data).first()
#         send_reset_email(user)
#         flash('An email has been sent with instructions to reset your password.', 'info')
#         return redirect(url_for('login'))
#     return render_template('reset_request.html', title='Reset Password', form=form)


# @app.route("/reset_password/<token>", methods=['GET', 'POST'])
# def reset_token(token):
#     if current_user.is_authenticated:
#         return redirect(url_for('home'))
#     user = User.verify_reset_token(token)
#     if user is None:
#         flash('That is an invalid or expired token', 'warning')
#         return redirect(url_for('reset_request'))
#     form = ResetPasswordForm()
#     if form.validate_on_submit():
#         hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
#         user.password = hashed_password
#         db.session.commit()
#         flash('Your password has been updated! You are now able to log in', 'success')
#         return redirect(url_for('login'))
#     return render_template('reset_token.html', title='Reset Password', form=form)