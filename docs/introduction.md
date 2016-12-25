# <a href='https://dallasmorningnews.github.io/chartwerk/'><img src='logo.png' height='55'></a>


### What is Chartwerk?

Chartwerk is an application for developing data visualizations and publishing them as embeddable, flat pages to a hosting service such as Amazon S3.

It consists of two applications:

1. A backend application that includes RESTFUL endpoints for charts and chart templates, navigational pages for users to select the type of chart template they'd like to build from and logic to handle "baking" the charts to S3 or another flat storage service.
2. A pluggable front-end application to create and manipulate charts and chart templates before saving them to the backend app.

chartwerk-editor represents the latter. You can find an example of the former at [django-chartwerk](https://github.com/DallasMorningNews/django-chartwerk-redux).

### OK, so "chartwerk-editor?"

chartwerk-editor is a React/Redux-based editor for charts and chart templates. It is the heart of the Chartwerk project.

It's designed to be flexible for both non-coding chart creators and chart template developers so they can build almost any chart type that can be built from tabular/spreadsheet data.

### Do we really need another chart maker?

Why, yes! Well, maybe.

Like many chart builders, Chartwerk provides an interface for non-coders to easily create interactive and static charts. However, you may find, like we did, that most chart makers are set-and-forget systems that aren't well designed to grow with the needs of your team.

Chartwerk was designed to be more flexible and a more collaborative tool between coders and non-coders. It lets developers easily build and tweak charts directly alongside non-coding creators. It accomplishes this by exposing a robust internal API that translates tabular data into discrete dataviz properties developers can build chart templates on top of on the fly.

At *The Dallas Morning News*, Chartwerk helps us develop dataviz quickly in response to the needs of beat reporters and scale our development time multiplied by every chart our reporters build from the templates we create.

That said, Chartwerk may not be the best choice among all other chart builders for your team if you don't have at least one developer to help build up your chart template set.

