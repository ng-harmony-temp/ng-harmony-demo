# compucorp
Spotify Music Search - by DI (FH) Johannes Neugschwentner aka _joehannes_

# Run

1.) git clone
2.) npm i
3.) npm start

# Test

1.) npm i -g karma-cli
2.) karma start

I do have an npm script to kick off karma, but on my machine it doesn't work due to a bug in karma. My suspicion is it directly goes to local karma and that somehow doesn't understand the ES.Next decorators included ...

# State of the Union

I consider this thingy done and suitable to make the day of somebody :)

Addressing the issues stated in the task sheet:

_Design:_
* I think it's almost and pretty pixel perfect ... There's always something wrong and usually you got comminication there and back up the pipeline ...

_Tests:_
* A few Unit Tests only
* To defend the poor test coverage and lack of e2d or selenium tests I got to say I was just IP-blacklisted from Spotify and can't get test data anymore.
* I dearly hope you'll go easy on that as I really tried to provide a decent project that will do the job and get me this job :)

_Build Process:_
* Npm Scripts to kick off webpack etc ...
* I created a gulp task as well but deleted it since I got blacklisted by Spotify and couldn't test properly anymore. My goal was to rewrite everything to literate programming with proper documentation, but I dare not do it unless I insert incomplete code or the odd bug and can't even check if that is so ...
So I deleted the gulp task again ...

_Scaffolding & Seeds:_
* No sir, I was very brave and nice and started from scratch

_Do not use a CSS (UI) Framework:_
* The only CSS framework I use is inuit, but it's in no way an UI framework like bootstrap or Foundation ... as the author says it's rather a school of thought, a set of rules for writing proper CSS ... Inuit CSS is the authors implementation of helpers to that school of thought

_CSS preprocessor:_
* I chose to use SCSS

_Browser Compatibility:_
* I am sitting on my linux machine here and didn't have the time to install virtual machines for Windows/Mac (IE/Safari) ... so please go soft on the odd bug in those two browsers

_README:_
* You're reading the same

_DESIGN PATTERNS:_
* You'll find plenty ...
* Especially in the ng-harmony libs I myself developed and debugged (hacked on it to finish and debug it during this project) ... I'd love you to consider this lib as kinda part of my effort to impress

_ES MODULES:_
* Yes, sir!

_Caching/Local Storage:_
* I chose to use RxDB with an IndexDB adapter for local storage as to max out browser compaptibility (author says it's IE 10+)

_Libraries:_
* No font packs, only the given Raleway
* [ng-harmony](http://www.github.com/ng-harmony)

_Anything else_:
* RxDB is a bit more than just LocalStorage
* Ng-Harmony is a bit more than just patterns and OO-angularjs
* Rollbar for remote debugging
* Styled and Environment aware local console debugging
* InuitCSS with its ITCSS (inverted triangle) is the best thing on CSS I know

# Known Issues

* Year is not to be found easily ... Since the year is only included in specific single album result queries on the Spotify API and I would have to fire several HTTP-Requs at the same time ... I left this out for now ... the app might get banned if you implement it this way from the API ... this requires a biggish workaround and I hope this is not a problem for now :)

* On a cached (not initial) search for discocgraphy on an artist, the result differs from the pure spotify query. Spotify seems to internally also look up albums where the artist is mentioned by one track for example ... To do such a JOIN is very difficult on the client side without a specific API ... I left it out ... so the 1+nth query (cached) always returns pure albums by the artist only .. pure as in the artists album, not a compilation or whatever

* The Searchbar has slight bumps in chrome. This is a (known) chrome bug. I tried to get rid of it but after spending an hour or two on the topic went on.

* I tested in Firefox / Chrome only ... didn't have virtual machines installed (yet) on my linux and that would have been a bit time consuming.

* The build process included is an npm/webpack approach. Since I wasn't allowed to use scaffolding tools or seeds ... I chose to not spend time on writing my own gulp pipeline --- I wanted to make sure I get done

* Sorting Results: In the beginning I sorted Results alphabetically, which was nice in a way: They were not only sorted alphabetically, but also it wasn't all albums first, all artists then ... But in the end this approach leads to an almost unusable result for the user when clicking the more button, since the stuff gets reordered always ... so I chose not to sort ... An approach to this could be for example: <hr> separate search results as to be visually separate entries and sort those individually ...

# Possible Layout Mistakes in albumcard/artistcard

* While unittesting I saw I had some html-ids in the ng-repeat directives of albumcard and artistcard ... this is a no go ...
So flying blind, already blacklisted by Spotify, I changed them to classes.
I dearly hope this went right and it looks good, but I can't tell as of now. (I'm a bit tired after 2.5 weeks coding this day by day and I need a day off)

# Extras

* I hacked and pushed to RxDB (2 bugs) along the way
* I hacked ng-harmony along the way
* I debugged my way through we-js-logger and bunyan in the browser
* I helped people on the gitter channel
* I reported an Atom bug (crashes on method decorators)