with open(".github/workflows/universal-ci.yml", "r") as f:
    content = f.read()

content = content.replace("branches: [ \"main\" ]", "branches: [\"main\"]")

with open(".github/workflows/universal-ci.yml", "w") as f:
    f.write(content)
