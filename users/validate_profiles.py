import yaml
import json
from jsonschema import validate, Draft202012Validator, exceptions
import os

# Paths
schema_file = "profile-schema.yaml"
profiles_dir = "."

def load_yaml(path):
    with open(path, 'r', encoding='utf-8') as f:
        return yaml.safe_load(f)

def validate_profile(profile_path, schema):
    try:
        profile_data = load_yaml(profile_path)
        validate(instance=profile_data, schema=schema)
        print(f"✅ {profile_path} is valid.")
    except exceptions.ValidationError as ve:
        print(f"❌ {profile_path} is INVALID:\n  → {ve.message}")
    except Exception as e:
        print(f"⚠️  Error processing {profile_path}:\n  → {e}")

def main():
    schema = load_yaml(schema_file)
    validator = Draft202012Validator(schema)

    for file in os.listdir(profiles_dir):
        if file.startswith("profile-") and file.endswith(".yaml"):
            validate_profile(os.path.join(profiles_dir, file), schema)

if __name__ == "__main__":
    main()
