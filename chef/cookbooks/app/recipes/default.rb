#
# Cookbook Name:: app
# Recipe:: default
#
# Copyright 2016, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#

# get up-to-date nodejs
execute 'curl_nodejs_ppa' do
	command "curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -"
end

package 'nodejs' do
	action:install
end

package 'build-essential' do
	action:install
end

execute 'npm_install' do
	cwd '/home/vagrant/project/app'
	command 'npm install'
end

# start the app
