class RemoveBorrowedFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column(:users, :borrowed)
  end
end
