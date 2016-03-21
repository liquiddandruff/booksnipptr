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

execute 'npm_install' do
	cwd '/home/vagrant/project/app'
	command 'npm install'
end

execute 'pip_install' do
	cwd '/home/vagrant/project/app'
	command 'pip install -r requirements.txt'
end

execute 'db_setup' do
	cwd '/home/vagrant/project/app'
	command 'python server/initdb.py'
end

execute 'app_distribute' do
	cwd '/home/vagrant/project/app'
	command 'npm run dist'
end

# temporary only
# start server in background and disown, throw away stdout stderr
execute 'run' do
	cwd '/home/vagrant/project/app'
	command 'npm run gunicorn &> /dev/null &|'
end
