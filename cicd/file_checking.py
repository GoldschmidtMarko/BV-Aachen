import os
from html.parser import HTMLParser

print_line_seperator = "###############################################################"

class HTMLSyntaxChecker(HTMLParser):
    def __init__(self, file_path, content):
        super().__init__()
        self.file_path = file_path
        self.lines = content.splitlines()
        self.tag_stack = []
        self.errors = []
        self.current_line = 1

    def handle_starttag(self, tag, attrs):
        if tag not in SELF_CLOSING_TAGS:
            self.tag_stack.append((tag, self.current_line))

    def handle_startendtag(self, tag, attrs):
        # This handles tags like <img ... />, <br />, etc.
        pass

    def handle_endtag(self, tag):
        if self.tag_stack and self.tag_stack[-1][0] == tag:
            self.tag_stack.pop()
        else:
            self.errors.append((tag, self.current_line, 'unexpected closing', self.lines[self.current_line-1]))

    def handle_data(self, data):
        self.current_line += data.count('\n')

    def check_unclosed_tags(self):
        for tag, line in self.tag_stack:
            self.errors.append((tag, line, 'unclosed opening', self.lines[line-1]))

    def print_errors(self):
        for tag, line, error, line_content in self.errors:
            print(f"Error: {error} tag <{tag}> found at line {line} in file '{self.file_path}'")
            print(f"Line content: {line_content}")
            print()

SELF_CLOSING_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr"
}

def check_html_syntax(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    checker = HTMLSyntaxChecker(file_path, content)
    checker.feed(content)
    checker.check_unclosed_tags()
    checker.print_errors()

def check_documents(doc_paths):
    for doc_path in doc_paths:
        if os.path.exists(doc_path) and os.path.isfile(doc_path):
            print()
            print(print_line_seperator)
            print(f"Checking document: {doc_path}")
            check_html_syntax(doc_path)
        else:
            print(f"File '{doc_path}' does not exist or is not a file.")

# Example usage:
doc_paths = [
    'index.html',
    'kontakt.html',
    "alemannencup.html",
    "datenschutz.html",
    "FAQ.html",
    "impressum.html",
    "teams.html",
    "training.html",
    "verein.html",
    # Add more document paths here
]

check_documents(doc_paths)
