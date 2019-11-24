# Planificator

[![star this repo](http://githubbadges.com/star.svg?user=Lab-Astek&repo=Planificator&style=default)](https://github.com/Lab-astek/Planificator/stargazers)
[![fork this repo](http://githubbadges.com/fork.svg?user=Lab-Astek&repo=Planificator&style=default)](https://github.com/Lab-astek/Planificator/fork)
[![GitHub Issues](https://img.shields.io/github/issues/Lab-astek/Planificator.svg)](https://github.com/Lab-astek/Planificator/issues)
[![GitHub contributors](https://img.shields.io/github/contributors/Lab-astek/Planificator.svg)](https://GitHub.com/Lab-astek/Planificator/graphs/contributors/)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-green.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
> Web application to manage Asteks assignations

### Note from the creator

Hello guys! ;)

This little baby is still under heavy development. You can see my roadmap below!

This will be updated with the release of the first stable version

## Introduction

The purpose of Planificator is to help the Lab Astek to handle assignations.

It allows Asteks to see their assignations, to block days where they aren't availables, and to link those informations with their Google calendar!

It also comes with an admin interface, allowing Lab Astek referents to easily manage all Asteks

Maybe is it the end of the old Sunday-Excel epoch..? Maybe are we in Epitech, the IT innovation school? Who nose.

___

Feel free to contribute, or to send tips !

And don't hesitate to give a star if you like it, of course!

____

## Deployment

1. Configure environment variables in the `.env` at the root of the repository:

2. Run `docker-compose up --build`

## Tests

> A pipeline of CI / CD will be built soon! ;) Don't be so impatient!

## Documentation

> The documentation is not ready for now, as the project is still in development and subject to changes

## Roadmap

- [ ] Back-end
   - [ ] Architecture
      - [x] Safe back-end architecture
      - [x] Linter
      - [x] Babel
      - [ ] Tests
      - [ ] CI
      - [ ] CD on Astek's servers / raspberry
      - [x] Dockerfile and docker-compose
   - [x] Connection with Firebase services
   - [x] Authentification
      - [x] Authentification flow
      - [x] Google OAuth2.0, with access to Google calendar
   - [x] Roles
      - [x] Role restriction flow
      - [x] Role management (CRUD)
   - [ ] Activities
      - [ ] Fetching activities from the intranet
      - [ ] Give preferences for activities
   - [ ] Assignations
      - [ ] Block particular dates
      - [ ] Assign Astek to an activity
      - [ ] Remove Astek from an activity
      - [ ] Switch assignations
   - [ ] Synchronization with Google Calendar

___

- [ ] Front-end

## Contributing

1. Fork it (<https://github.com/Lab-Astek/Planicator/fork>)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

## Contributors

- [LeChatErrant](https://github.com/LeChatErrant) - creator and maintainer
