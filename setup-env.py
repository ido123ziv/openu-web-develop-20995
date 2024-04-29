import os
dir_path = os.path.dirname(os.path.realpath(__file__))
file_path = f"{dir_path}/.env"
if os.path.exists(file_path):
    with open(file_path, 'r') as env_file:
        envs = env_file.readlines()
    for line in envs:
        print(line)
        key,value = line.split("=")
        os.environ[key] = value.replace("'",'')
else:
    print("no .env file found, defaulting to compose defaults")

for name, value in os.environ.items():
    print("{0}: {1}".format(name, value))