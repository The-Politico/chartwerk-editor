# <a href='https://dallasmorningnews.github.io/chartwerk/'><img src='logo.png' height='55'></a>


### What is Chartwerk?

Chartwerk is an application for developing data visualizations and publishing them as embeddable, flat pages to a hosting service such as Amazon S3.

It generally consists of two parts:

1. An application that includes a RESTFUL backend to save charts and chart templates, navigational pages for users to select the type of chart template they'd like to build from and logic to handle "baking" the charts to S3 or another flat storage service.
2. A pluggable front-end application that serves as an editor to create and manipulate charts and chart templates before saving them to the backend app.

chartwerk-editor represents the latter. You can find an example of the former at [django-chartwerk](https://github.com/DallasMorningNews/django-chartwerk-redux).

### OK, so "chartwerk-editor?"

chartwerk-editor is a React/Redux-based editor for charts and chart templates.

It's designed to be flexible for both non-coding chart creators and chart template developers so they can build almost any chart type that can be built from tabular/spreadsheet data.


