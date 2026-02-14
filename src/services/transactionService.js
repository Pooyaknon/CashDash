import { supabase } from './supabaseClient';

export const transactionService = {
  async getByDate(dateString) {
    try {
      // ตรวจสอบว่ามีค่า dateString ส่งมาไหม
      if (!dateString) return [];

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('date', dateString)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || []; // ป้องกันการคืนค่า null ส่งค่า Array ว่างแทน
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      throw error;
    }
  },

  // create item
  async addTransaction({ description, amount, type, date }) {
    try {
      // ตรวจสอบ User
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error("Please Login before add transcation");
      }

      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          user_id: user.id,
          description: description || "",
          amount: parseFloat(amount) || 0,
          type: type || 'expense', // ค่าเริ่มต้นเป็นรายจ่าย
          date: date || new Date().toISOString().split('T')[0]
        }])
        .select();

      if (error) throw error;
      return data ? data[0] : null;
    } catch (error) {
      console.error('Error adding transaction:', error.message);
      throw error;
    }
  },

  // delete item
  async deleteTransaction(id) {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting transaction:', error.message);
      throw error;
    }
  },

  // calculate total balance
  calculateBalance(transactions) {
    if (!Array.isArray(transactions)) 
        return 0;
    return transactions.reduce((total, item) => {
      const amount = Number(item.amount) || 0;
      return item.type === 'income' 
        ? total + amount 
        : total - amount;
    }, 0);
  }
};