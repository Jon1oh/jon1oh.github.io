---
# the default layout is 'page'
layout: project
subtitle: "Here are my projects."
title: Projects
icon: fas fa-laptop
order: 2
---

{% assign all_pinned = site.projects | where: 'pin', 'true' %}
{% assign all_normal = site.projects | where_exp: 'item', 'item.pin != true and item.hidden != true' %}
{% assign projects = '' | split: '' %}

<!-- Get pinned projects on current page -->
{% assign visible_start = paginator.page | minus: 1 | times: paginator.per_page %}
{% assign visible_end = visible_start | plus: paginator.per_page %}

{% if all_pinned.size > visible_start %}
{% if all_pinned.size > visible_end %}
{% assign pinned_size = paginator.per_page %}
{% else %}
{% assign pinned_size = all_pinned.size | minus: visible_start %}
{% endif %}

{% for i in (visible_start..all_pinned.size) limit: pinned_size %}
{% assign projects = projects | push: all_pinned[i] %}
{% endfor %}
{% else %}
{% assign pinned_size = 0 %}
{% endif %}

<!-- Get normal (non-pinned) projects on current page -->
{% assign normal_size = paginator.projects | size | minus: pinned_size %}
{% if normal_size > 0 %}
{% if pinned_size > 0 %}
{% assign normal_start = 0 %}
{% else %}
{% assign normal_start = visible_start | minus: all_pinned.size %}
{% endif %}
{% assign normal_end = normal_start | plus: normal_size | minus: 1 %}
{% for i in (normal_start..normal_end) %}
{% assign projects = projects | push: all_normal[i] %}
{% endfor %}
{% endif %}