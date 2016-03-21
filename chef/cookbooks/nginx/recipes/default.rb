#
# Cookbook Name:: nginx
# Recipe:: default
#
# Copyright 2016, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
include_recipe "baseconfig"

package 'nginx' do
	action:install
end

cookbook_file "/etc/nginx/sites-available/default" do
	source "nginx.conf"
	mode "0644"
end

service "nginx" do
	action:restart
end
