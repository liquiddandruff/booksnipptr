#
# Cookbook Name:: postgresql
# Recipe:: default
#
# Copyright 2016, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
package 'postgresql' do
	action:install
end

execute 'setup_postgresql' do
	command "echo \"CREATE DATABASE booksnipptr; CREATE USER app_user PASSWORD 'password'; GRANT ALL PRIVILEGES ON DATABASE booksnipptr TO app_user;\" | sudo -u postgres psql"
end
