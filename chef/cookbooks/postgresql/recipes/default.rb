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
	command "echo \"CREATE DATABASE app_dev; CREATE USER app_user PASSWORD 'password'; GRANT ALL PRIVILEGES ON DATABASE app_dev TO app_user;\" | sudo -u postgres psql"
end
