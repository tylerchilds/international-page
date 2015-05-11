git stash
git checkout master
git fetch
git pull origin HEAD
gulp compile
git add --all :/
git commit -m "automated deployment compiliation"
gulp bump --defcon $1

### Update Changelog
printf '\n' | cat - CHANGELOG.md > temp && mv temp CHANGELOG.md
git log --pretty=format:"- %s%n%b" --since="$(git show -s --format=%ad `git rev-list --tags --max-count=1`)" | cat - CHANGELOG.md > temp && mv temp CHANGELOG.md
printf '\n' | cat - CHANGELOG.md > temp && mv temp CHANGELOG.md
git describe --abbrev=0 | cat - CHANGELOG.md > temp && mv temp CHANGELOG.md
sed -Ei.bak '1s/^(.*)$/### \1/' CHANGELOG.md
rm CHANGELOG.md.bak

git add --all :/
git commit -m "automated changelog updated"

git push
git push --tags