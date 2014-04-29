namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    make_users
  end
end

def make_users
  User.create!(name:     "Adal",
               email:    "adalsingh2011@gmail.com",
               password: "123456",
               password_confirmation: "123456")
end