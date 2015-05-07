# generator-mightymeteorites 

An(other) opinionated Meteor.js scaffolding tool for Yeoman.

----

## Setup

Before you'll get any use out of this, you'll need to install [Meteor](http://docs.meteor.com/#quickstart) and [Yeoman](http://yeoman.io/gettingstarted.html)

Here are the combined instructions at the time of this writing:

```
# Meteor
curl https://install.meteor.com | /bin/sh

# Yeoman
npm install -g yo

# This generator
npm install -g generator-mightymeteorites
```


## Scaffolding

The following command will scaffold a new meteor app for you.  You will be prompted for the name of your
starting collection.  For instance, if you were creating a blog you might choose `posts` as the name
of your starting collection.

You will also be asked if you would like to include the package `iron:router` and you can choose from
either `twbs:bootstrap` or `materialize:materialize` for your UI.

To scaffold create a directory and then inside the directory call `yo mightmeteorites`.

```
mkdir my-app && cd my-app
yo mightymeteorites
```

As part of the scaffolding the meteor project will be updated to the latest version and all packages will
be updated to the latest compatible version.

After your app is scaffolded, you can start your app with:

```
meteor
```

## Structure

The generated app will have the following structure by default (assuming `iron:router` and `materialize:materialize` and a starting collection "puppies")

```
/
    README.md
    .meteor/
        gitignore
        release
    server/
        startup.js
        publications/
            puppies.js
    public/
        robots.txt
    collections/
        puppies.js
    client/
        subscriptions/
            puppies.js
        views/
            puppies/
                template.html
                events.js
                helpers.js
                rendered.js
                routers.js
            base/
                footer.html
                header.html
                sidebar.html
                rendered.js
                style.css
            template/
                layout.html
                loading.html
                not_found.html
                router.js
```


## Sub-Generators

There are two Yeoman sub-generators to simplify common development tasks:

### view

The view sub-generator creates the following files.  You can also use the option
`--ironRouter` to include a `client\views\my_view\routers.js` file.

`yo mightymeteorites:view my_view`

```
/
    client/
        views/
            my_view/
                template.html
                events.js
                helpers.js
                rendered.js
```

`yo mightymeteorites:view my_view --ironRouter`

```
/
    client/
        views/
            my_view/
                template.html
                events.js
                helpers.js
                rendered.js
                routers.js
```

### collection

The collection sub-generator creates the following files.  You can also use the option
`--ironRouter` to include a `client\views\my_view\routers.js` file.

`yo mightymeteorites:collection cats`

```
/
    server/
        publications/
            cats.js
    collections/
        cats.js
    client/
        subscriptions/
            cats.js
        views/
            cats/
                template.html
                events.js
                helpers.js
                rendered.js
                routers.js
```

`yo mightymeteorites:collection cats --ironRouter`

```
/
    server/
        publications/
            cats.js
    collections/
        cats.js
    client/
        subscriptions/
            cats.js
        views/
            cats/
                template.html
                events.js
                helpers.js
                rendered.js
                routers.js
                routers.js
``` 

## License

MIT