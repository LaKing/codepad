#!/bin/bash

git add .
git commit -m $(cat version)
git push

