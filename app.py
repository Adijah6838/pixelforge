# app.py - serve PixelForge
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os
app = FastAPI(title="PixelForge")
if os.path.exists("."):
    app.mount("/", StaticFiles(directory=".", html=True), name="static")
