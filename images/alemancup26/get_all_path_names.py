import os

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.realpath(__file__))

# List all files in the directory
files = sorted([
    f for f in os.listdir(script_dir)
    if f.lower().endswith('.jpg') and 'logo' not in f.lower()
])

# Print the names of all files
for file in files:
    if os.path.isfile(os.path.join(script_dir, file)):
        print(file)
