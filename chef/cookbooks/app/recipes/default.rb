#
# Cookbook Name:: app
# Recipe:: default
#
# Copyright 2016, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
#

# setup upstart service
cookbook_file "/etc/init.d/booksnipptr" do
	source "booksnipptr.conf"
	mode '0755'
end

# get up-to-date nodejs
execute 'curl_nodejs_ppa' do
	command "curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -"
end

# get up-to-date pip
execute 'pip' do
	command "curl -sL https://bootstrap.pypa.io/get-pip.py | python"
end

package 'nodejs' do
	action:install
end

package 'build-essential' do
	action:install
end

package 'libpq-dev' do
	action:install
end

package 'python-dev' do
	action:install
end

execute 'npm_install' do
	cwd '/home/vagrant/project/'
	command 'npm install'
end

execute 'venv_install' do
	cwd '/home/vagrant/project/'
	command 'pip install virtualenv'
	command 'virtualenv venv'
	command 'source ./venv/bin/activate'
end

execute 'pip_install' do
	cwd '/home/vagrant/project/'
	command 'pip install -r requirements.txt'
end

execute 'db_setup' do
	cwd '/home/vagrant/project/'
	command 'python server/initdb.py'
end

execute 'build app, npm run dist' do
	cwd '/home/vagrant/project/'
	command 'npm run dist'
end

service 'booksnipptr' do
	action [ :enable, :start ]
end

# temporary only
# start server in background and disown, throw away stdout stderr
# execute 'run' do
# 	cwd '/home/vagrant/project/'
# 	command 'npm run gunicorn &> /dev/null &|'
# end
