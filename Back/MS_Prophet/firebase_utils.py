# App/firebase_utils.py
import firebase_admin
from firebase_admin import credentials, storage

cred = credentials.Certificate(r"C:\Users\Engel\Desktop\dbz\ServeSync\Back\MS_Prophet\servesync-46af3-firebase-adminsdk-fbsvc-6e7cf6093b.json")


firebase_admin.initialize_app(cred, {
    'storageBucket': 'servesync-46af3.firebasestorage.app'
})

bucket = storage.bucket()

def upload_model(file_path, model_name):
    blob = bucket.blob(f"models/{model_name}.pkl")
    blob.upload_from_filename(file_path)
    print(f"Modelo {model_name} subido a Firebase Storage.")

def download_model(model_name, destination_path):
    blob = bucket.blob(f"models/{model_name}.pkl")
    blob.download_to_filename(destination_path)
    print(f"Modelo {model_name} descargado a {destination_path}.")
