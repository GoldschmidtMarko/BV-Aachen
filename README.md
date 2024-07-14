# BV-Aachen Repository
This repository is used for the BV-Aachen homepage.

The homepage is available under [www.bv-aachen.de](www.bv-aachen.de).

## CICD
 
The cicd pipeline can be used to publish the content of the repository under [http://test.bv-aachen.de/](http://test.bv-aachen.de/).

Given that this repository contains files that are not required to be uploaded, the variable ```uploadable_file_names``` in the cicd script ```cicd/script.py``` defines an "allow list".

In order to trigger the publish, the following flags can be used:

```
#force
deletes the content on the website server, and uploads everything from this repo

#upload 
finds the last #upload commit and uploads/ deletes all files modified
```


