# NWA Project Governance
This document is adapted from [nodejs/node GOVERNANCE.md](https://github.com/nodejs/node/blob/master/GOVERNANCE.md). 

## Roles
* Contributor: Anyone who has made any kind of contribution to NWA
* Maintainer: A trusted contributor responsible for maintaining the NWA Github repository

## Project goals & values
The NWA project is self-sustaining and essentially owned by the group of Maintainers. The goals of the project are the goals of its contributors.

One of the primary goals of this project is to make home security accessible by creating a user friendly system.
Furthermore, we want to encourage further development of the project by minimizing the barrier of entry for new developers and maintaining a friendly and inclusive discourse.

You are expected to follow *and* hold others accountable to the [Code of Conduct][].

# Maintainers
NWA Maintainers have commit access to the [neighborhood-watch-alarm/nwa][] Github repository and maintain the repository.

Both Maintainers and non-Maintainer Contributors may propose changes to the NWA source code. 
The mechanism to propose such a change is a GitHub pull request as described in the guidelines for [Contributing].
Maintainers review and merge pull requests.

Two Maintainers must approve a pull request before the pull request can be merged.
(One Maintainers approval is enough if the pull request has been open for more
than 7 days.) 
Approving a pull request indicates that the Maintainers accepts responsibility for the change. 
Approval must be from Maintainers who are not authors of the change. 
If there is less than three Maintainers on the project, then all Maintainers must approve a pull request before it is merged.

If a Maintainer opposes a proposed change, then the change cannot be merged. The
exception is if rest of the Maintainers vote to approve the change despite the opposition.
Usually, a vote will be unnecessary: Often, discussions or further changes result in Maintainers removing their opposition.

See:

* [List of Maintainers](./README.md#current-project-team-members)

## Maintainer Activities
* Helping users and novice contributors
* Contributing code and documentation changes that improve the project
* Reviewing and commenting on issues and pull requests
* Merging pull requests
* Project governance and process (including this policy)

Maintainers can be removed if they commit a significant or repeated violation of the [Code of Conduct][].

Maintainers as a group have final authority over this project, including:
* Technical direction
* Contribution policy
* Conduct guidelines
* Maintaining the list of Maintainers
* Setting release dates.
* Release quality standards.

## Consensus-seeking process
Consensus happens over the developer mailing list.
Maintainers are the ones that reach consensus, though input from other contributors are appreciated. If a vote happens, only Maintainers should vote. 
Maintainers with the most significant contributions recently have the most say, followed by Maintainers with the most significant contributions historically.

The need for consensus seeking includes issues that are at an impasse. Any community member can create a GitHub issue asking that the Maintainers review
something, mentioning the @neighborhood-watch-alarm/maintainers. If consensus-seeking fails in the discussion in the comments on the issue, a Maintainer may move the discussion to the mailing list.

Consensus seeking process:
* A Maintainer messages to the mailing list explaining the proposal/issue.
* The proposal passes if, after 72 hours, there are two or more Maintainer approvals
  and no Maintainer opposition.
* If there is an extended impasse, a Maintainer may make a motion for a vote.

## Maintainer Nominations

Existing Maintainers can nominate someone to become a Maintainers. Nominees
should show significant commitment to the project and its development.

To nominate a new Maintainer, open an issue in the [simoneengelbr/nsw][] repository.
Provide a summary of the nominee's contributions. For example:

* Commits in the [neighborhood-watch-alarm/nwa][] repository.
  * Use the link `https://github.com/neighborhood-watch-alarm/nwa/commits?author=GITHUB_ID`
* Pull requests and issues opened in the [neighborhood-watch-alarm/nwa][] repository.
  * Use the link `https://github.com/neighborhood-watch-alarm/nwa/issues?q=author:GITHUB_ID`
* Comments on pull requests and issues in the [neighborhood-watch-alarm/nwa][] repository
  * Use the link `https://github.com/neighborhood-watch-alarm/nwa/issues?q=commenter:GITHUB_ID`
* Reviews on pull requests in the [neighborhood-watch-alarm/nwa][] repository
  * Use the link `https://github.com/neighborhood-watch-alarm/nwa/pulls?q=reviewed-by:GITHUB_ID`
* Help provided to end-users and novice contributors
* Participation in other projects, teams, and working groups of the open source community 

Mention @neighborhood-watch-alarm/maintainers in the issue to notify other Maintainers about
the nomination.

The nomination passes if no Maintainers oppose it after one week. Otherwise,
the nomination fails.

There are steps a nominator can take in advance to make a nomination as
frictionless as possible. Use the [Governance mailing list][] to request
feedback from other Maintainers in private. A nominator may also work with the
nominee to improve their contribution profile.

Maintainers might overlook someone with valuable contributions. In that case,
the contributor may open an issue or contact a Maintainer to request a
nomination.

## Onboarding
New Maintainer checklist:
1. Become a member of the Maintainer-team on the [neighborhood-watch-alarm][] GitHub organization.
1. Consider making your membership in the [neighborhood-watch-alarm][] GitHub organization public. This makes it easier to identify Maintainers. Instructions on how to do that are available at [Publicizing or hiding organization membership][].
1. If you haven't already, join the [developer mailing list](https://groups.google.com/u/1/g/nwa-forum/join).
1. Join the [governance mailing list](https://groups.google.com/u/1/g/nwa-gov/join)
1. Gain commit-access on the [neighborhood-watch-alarm/nwa][] repository. This must be granted by a current Maintainer.
1. Use [https://github.com/notifications](https://github.com/notifications) or set up email
1. Become familiar with the [Code of Conduct][].
1. Make a PR adding yourself to the [README][]. Collaborators are in alphabetical order by GitHub username.
1. Gain acces to the Heroku staging- and production app, as well as the CD pipeline. 
  
## Managing the issue tracker

* You have (mostly) free rein; don't hesitate to close an issue if you are
  confident that it should be closed
  * Be nice about closing issues! Let people know why, and that issues and PRs
    can be reopened if necessary

* Feel free to apply relevant labels and remove irrelevant labels from pull requests and issues.
  
* If there are no beginner-friendly issues open, consider creating one or more using the label "good first issue".

* If a discussion in the comments gets heated, you can request that other Maintainers keep
  an eye on it by sending a message to the governance mailing list.

## Reviewing PRs
* The primary goal is for the codebase to improve.
* Secondary (but not far off) is for the person submitting code to succeed. A
  pull request from a new contributor is an opportunity to grow the community.
* Review a bit at a time. Do not overwhelm new contributors.
  * It is tempting to micro-optimize. Don't succumb to that temptation. Techniques that provide improved performance today may be
    unnecessary in the future.
* Be aware: Your opinion carries a lot of weight!
* Requests for small changes that are not essential (nits) are fine, but try to
  avoid stalling the pull request.
  * Identify them as nits when you comment: `Nit: change foo() to bar().`
  * If they are stalling the pull request, fix them yourself on merge.
* If a pull request is abandoned, check if they'd mind if you took it over
    (especially if it just has nits left).
* Minimum wait for comments time
  * There is a minimum waiting time which we try to respect for non-trivial
    changes so that people who may have important input in such a distributed
    project are able to respond.
  * For non-trivial changes, leave the pull request open for at least 48 hours.
* Approving a change
  * Maintainers indicate that they have reviewed and approve of the changes in
    a pull request using GitHub’s approval interface
  * You have the authority to approve any other collaborator’s work.
  * You cannot approve your own pull requests.
  * When explicitly using `Changes requested`, show empathy – comments will
    usually be addressed even if you don’t use it.
    * If you do, it is nice if you are available later to check whether your
      comments have been addressed
    * If you see that the requested changes have been made, you can clear
      another collaborator's `Changes requested` review.
    * Use `Changes requested` to indicate that you are considering some of your
      comments to block the PR from landing.

* What belongs in NWA:
  * Opinions vary – it’s good to have a broad collaborator base for that reason!
  * Some changes may solve a niche need without contributing to the general use of NWA. In this case, consider whether changes should be accepted in the main repository or kept with the developer.
  
## Final notes
* Don't worry about making mistakes: everybody makes them, there's a lot to
  internalize and that takes time (and we recognize that!)
* Almost any mistake you could make can be fixed or reverted.
* The existing Maintainers trust you and are grateful for your help!


[neighborhood-watch-alarm/nwa]: https://github.com/simoneengelbr/nwa
[Publicizing or hiding organization membership]: https://help.github.com/articles/publicizing-or-hiding-organization-membership/
[Code of Conduct]: https://github.com/neighborhood-watch-alarm/nwa/blob/master/CODE_OF_CONDUCT.md
[README]: https://github.com/neighborhood-watch-alarm/nwa/blob/master/README.md
[Contributing]: https://github.com/neighborhood-watch-alarm/nwa/blob/master/CONTRIBUTING.md
[neighborhood-watch-alarm]: https://github.com/org/neighborhood-watch-alarm
