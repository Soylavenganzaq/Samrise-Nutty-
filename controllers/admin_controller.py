from flask import Blueprint, render_template, request, redirect, session, flash

admin_bp = Blueprint("admin", __name__)


@admin_bp.route("/admin")
def login():

    return render_template("admin/login.html")


@admin_bp.route("/login", methods=["POST"])
def iniciar_sesion():

    usuario = request.form["usuario"]

    password = request.form["password"]

    if usuario == "admin" and password == "12345":

        session["admin"] = True

        return redirect("/dashboard")

    flash("Usuario o contraseña incorrectos")

    return redirect("/admin")


@admin_bp.route("/dashboard")
def dashboard():

    if "admin" not in session:

        return redirect("/admin")

    return render_template("admin/dashboard.html")


@admin_bp.route("/logout")
def logout():

    session.clear()

    return redirect("/admin")