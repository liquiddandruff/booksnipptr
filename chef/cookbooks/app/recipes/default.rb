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
	# set local settings (python will fail otherwise)
	export LANGUAGE=en_US.UTF-8
	export LANG=en_US.UTF-8
	export LC_ALL=en_US.UTF-8
	locale-gen en_US.UTF-8
	sudo dpkg-reconfigure locales

	echo INSTALLING virtualenv and virtualenvwrapper
	sudo pip install virtualenv
	sudo pip install virtualenvwrapper

	# use mkvirtualenv to create the vm's venv outside of shared project dir
	export WORKON_HOME=/home/vagrant/.virtualenvs
	source /usr/local/bin/virtualenvwrapper.sh
	echo CREATING + ACTIVATING VENV
	mkvirtualenv booksnipptr
	workon booksnipptr
	cd '/home/vagrant/project/' # workon doesn't seem to chdir

	echo PIP INSTALLING REQS.TXT
	# if cache-dir is enabled, pip tries to create stuff in root, so disable it
	pip install --no-cache-dir -r requirements.txt
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
