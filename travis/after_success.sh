git config --global user.email "lbmcleod@gmail.com"
git config --global user.name "bmcleod"
echo "Host heroku.com" >> ~/.ssh/config
echo "   StrictHostKeyChecking no" >> ~/.ssh/config
echo "   CheckHostIP no" >> ~/.ssh/config;
echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config;
if [[ $TRAVIS_PULL_REQUEST == "false" && $TRAVIS_BRANCH == "dev" ]]
  then
    gem install heroku
    heroku keys:clear
    echo yes | heroku keys:add
    gulp build
    echo yes | gulp buildcontrol:heroku
    heroku keys:clear
fi
if [[ $TRAVIS_PULL_REQUEST == "false" ]]
  then
    echo $TRAVIS_BRANCH
fi
echo
echo "...done."
