# BV-Aachen Repository
This [repository](https://github.com/GoldschmidtMarko/BV-Aachen) is used for the BV-Aachen homepage.

The homepage is available under [https://www.bv-aachen.de/](https://www.bv-aachen.de/).

## CICD
 
The cicd pipeline can be used to publish the content of the repository under [http://test.bv-aachen.de/](http://test.bv-aachen.de/).

### Branches

| Branch | Purpose |
|--------|---------|
| `dev` | **Deploy branch for the test site.** Pushes to `dev` with an `#upload`/`#force` commit message are published to [http://test.bv-aachen.de/](http://test.bv-aachen.de/). |
| `main` | Production branch ([https://www.bv-aachen.de/](https://www.bv-aachen.de/)). Protected: changes only via merged pull requests, no direct commits. |

Workflow: commit to `dev` -> check the result on test.bv-aachen.de -> open a pull request `dev` -> `main`.

Given that this repository contains files that are not required to be uploaded, the variable ```uploadable_file_names``` in the cicd script ```cicd/script.py``` defines an "allow list".

In order to trigger the publish, the following flags can be used:

```
#force
deletes the content on the website server, and uploads everything from this repo

#upload 
finds the last #upload commit and uploads/ deletes all files modified
```



## Server configuration (`php/db_config.php`)

For security reasons, `php/db_config.php` currently has to be modified directly on the server. Changes made to this file in the repository are not a reliable source of truth for the live configuration, so do not expect a deploy to update the production values.

If this file needs to be changed, contact Marko ([GoldschmidtMarko](https://github.com/GoldschmidtMarko)).
