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

bash 'venv_app_setup' do
	user "vagrant"
	code <<-EOH
		cd '/home/vagrant/project/'
		sudo pip install virtualenv
		virtualenv ./venv
		source ./venv/bin/activate
		pip install -r requirements.txt
		python server/initdb.py
		npm run dist
    EOH
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
