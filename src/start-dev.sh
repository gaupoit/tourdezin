#! /bin/bash
#check whether vagrant is installed
if ! type vagrant > /dev/null; then
	echo " 😅  Please install vagrant - https://docs.vagrantup.com/v2/installation/ "
	exit -1
fi

#check whether vagrant-gatling-rsync plugin is installed
if ! vagrant plugin list | grep -p 'vagrant-gatling-rsync'; then
	echo "👀  Could not find vagrant-gatling-rsync plugin "
	read -r -p "💃  Would you like to install vagrant-gatling-rsync? [y/N] " response
	case $response in
		[yY][eE][sS]|[yY])
			vagrant plugin install vagrant-gatling-rsync
			;;
		*)
			echo "💃  Need vagrant-gatling-rsync to continue, exiting "
			exit -1
			;;
	esac
fi

#check whether vagrant-docker-compose plugin is installed
if ! vagrant plugin list | grep -p 'vagrant-docker-compose'; then
	echo "👀  Could not find vagrant-docker-compose plugin "
	read -r -p "💃  Would you like to install vagrant-docker-compose? [y/N] " response
	case $response in
		[yY][eE][sS]|[yY])
			vagrant plugin install vagrant-docker-compose
			;;
		*)
			echo "💃  Need vagrant-docker-compose to continue, exiting "
			exit -1
			;;
	esac
fi

# start vagrant and the vagrant rsync tool
vagrant up
cs="\033[33m"
ce="\033[0m"
echo -e $cs "Add this line in your /etc/hosts file:" $ce "\n"
echo -e "\t192.168.18.11  jp.dev.com\n"
echo -e $cs "And visit http://jp.dev.com:8080 to see your dev page" $ce "\n"
echo "⚡⚡ TIME TO FUCK JOB PORTAL ⚡⚡"
vagrant gatling-rsync-auto