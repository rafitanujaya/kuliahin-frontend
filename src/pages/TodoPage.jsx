import { useEffect, useState } from 'react';
import { 
  Plus, 
  X, 
  Trash2, 
  Edit3,
  CheckCircle2,
  Circle,
  Check,
  Save,
  ListTodo,
} from 'lucide-react';
import { createTodoApi, deleteTodoApi, getListTodoApi, updateTodoApi } from '@/api/todoApi';
import { TodoListSkeleton } from '@/components/TodoListSkeleton';
import { toast } from 'sonner';


export const TodoPage = () => {

    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Personal");
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(todos);

    const categories = [
      { name: "personal", color: "bg-emerald-100 text-emerald-700" },
      { name: "belajar", color: "bg-indigo-100 text-indigo-700" },
      { name: "organisasi", color: "bg-amber-100 text-amber-700" },
      { name: "lainnya", color: "bg-slate-100 text-slate-700" }
    ];

    const loadTodos = async () => {
      try {
        setLoading(true)
        const data = await getListTodoApi();
        setTodos(data.data) 
      } catch {
        toast.error('Gagal Memuat Todo', {
          position: 'top-center'
        })
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      loadTodos();
    }, [])


    const handleSaveTodo = async (e) => {
      e.preventDefault();
      if(!inputValue.trim()) return

      try {
        if(editId) {
          const todo = todos.find((t) => t.id == editId)
          // console.log(selectedCategory);
          // if (!todo) return
          const update = await updateTodoApi(editId, {
            title: inputValue,
            category: selectedCategory,
            status: todo.status
          })
          setEditId(null)
          setTodos((prev) => prev.map((t) => (t.id === editId ? update.data : t)))
        } else {
          const data = await createTodoApi({
            title: inputValue,
            category: selectedCategory,
            status: 'todo'
          })
          console.log(data);
          setTodos((prev) => [data.data, ...prev])
        }

        setInputValue('');
        setSelectedCategory('Personal')
      } catch (error) {
        console.log(error);
      }
    }

    const cancelEdit = () => {
      setInputValue('')
      setSelectedCategory('personal')
      setEditId(null)
    }

    const handleDeleteTodo = async(id) => {
      if (editId == id) cancelEdit()
      console.log(id);
      await deleteTodoApi(id)
      setTodos((prev) => prev.filter((t) => (t.id != id)))
    }

    const handleStartEdit = (todo) => {
      console.log(todo);
      setEditId(todo.id)
      setInputValue(todo.title);
      setSelectedCategory(todo.category)
    }

    const activeTodos = todos.filter((t) => t.status == 'todo')
    const completedTodos = todos.filter((t) => t.status == 'done')

    const toggleTodo = async(id) => {
      const todo = todos.find((t) => t.id == id);
      if(!todo) return
      if(todo.status == 'todo') {
        todo.status = 'done'
      } else {
        todo.status = 'todo'
      }

      const update = await updateTodoApi(id, {
        title: todo.title,
        category: todo.category,
        status: todo.status
      })
      console.log(update)
      setTodos((prev) => prev.map((t) => (t.id === id ? update.data : t)))
    }



    const getCategoryColor = (catName) => {
        const cat = categories.find(c => c.name === catName);
        return cat ? cat.color : 'bg-slate-100 text-slate-700';
    };

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Todo List</h1>
          <p className="text-slate-500 mt-1">Catat aktivitas harian dan hal-hal kecil di sini.</p>
        </div>

        {/* Input Section - Quick Capture & Edit */}
        <div className={`p-4 rounded-2xl border shadow-sm mb-8 sticky top-0 z-10 transition-colors ${editId ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-100'}`}>
          <form onSubmit={handleSaveTodo}>
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder={editId ? "Edit aktivitas..." : "Apa yang perlu dilakukan?"} 
                className={`w-full text-lg font-medium placeholder:text-slate-300 border-none focus:ring-0 p-2 outline-none bg-transparent`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
              <div className="flex items-center justify-between border-t border-slate-200/50 pt-3">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`text-xs m-2 font-bold px-3 py-1.5 capitalize rounded-full transition-all whitespace-nowrap ${
                        selectedCategory === cat.name 
                          ? cat.color + ' ring-2 ring-offset-1 ring-slate-200 shadow-sm' 
                          : 'bg-white/50 text-slate-400 hover:bg-white'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                   {editId && (
                     <button 
                       type="button"
                       onClick={cancelEdit}
                       className="text-slate-400 hover:text-slate-600 p-2 rounded-xl transition-colors"
                       title="Batal Edit"
                     >
                       <X size={20} />
                     </button>
                   )}
                   <button 
                    type="submit" 
                    disabled={!inputValue?.trim()}
                    className={`${editId ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'} text-white p-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md`}
                    title={editId ? "Simpan Perubahan" : "Tambah Baru"}
                  >
                    {editId ? <Save size={20} /> : <Plus size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Todo Lists */}
        { loading ? <TodoListSkeleton/> : <div className="space-y-8">
          
          {/* Active Items */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Circle size={10} className="fill-indigo-500 text-indigo-500"/>
                Akan Datang ({activeTodos.length})
            </h3>
            <div className="space-y-3">
              {activeTodos.map(todo => (
                 <div key={todo.id} className={`group flex items-center gap-3 p-4 bg-white rounded-2xl border transition-all ${editId === todo.id ? 'border-amber-400 ring-2 ring-amber-100' : 'border-slate-100 hover:border-indigo-200 hover:shadow-sm'}`}>
                    <button 
                        onClick={() => toggleTodo(todo.id)}
                        className="w-6 h-6 rounded-full border-2 border-slate-300 hover:border-indigo-500 flex items-center justify-center text-transparent hover:text-indigo-500 transition-all shrink-0"
                    >
                        <Check size={14} />
                    </button>
                    <div className="flex-1 min-w-0">
                        <p className="text-slate-800 font-medium">{todo.title}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold mt-1 inline-block ${getCategoryColor(todo.category)}`}>
                            {todo.category}
                        </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className={`flex gap-1 ${editId === todo.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all`}>
                        <button 
                            onClick={() => handleStartEdit(todo)}
                            className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            title="Edit"
                        >
                            <Edit3 size={18} />
                        </button>
                        <button 
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                            title="Hapus"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                 </div>
              ))}
              {activeTodos.length === 0 && completedTodos.length === 0 ? (
                // EMPTY STATE BESAR
                <div className="flex flex-col items-center text-slate-500 justify-center py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <ListTodo size={32} className="text-slate-300" />
                  </div>
                  <h3 className="font-semibold text-lg">Todo Kosong</h3>
                  <p className="text-xs mt-1 mb-4">
                    Tidak ada todo sama sekali. Yuk mulai produktif!
                  </p>
                </div>
              ) : activeTodos.length === 0 ? (
                // HANYA ACTIVE KOSONG
                <p className="text-xs mt-1 mb-4 text-center text-slate-400">
                  Tidak ada todo aktif. Yuk mulai produktif!
                </p>
              ) : null}
            </div>
          </div>

          {/* Completed Items */}
          {completedTodos.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                 <CheckCircle2 size={14} />
                 Selesai ({completedTodos.length})
              </h3>
              <div className="space-y-3 opacity-60">
                 {completedTodos.map(todo => (
                    <div key={todo.id} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-transparent">
                        <button 
                            onClick={() => toggleTodo(todo.id)}
                            className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-emerald-500 flex items-center justify-center text-white shrink-0"
                        >
                            <Check size={14} />
                        </button>
                        <div className="flex-1 min-w-0">
                            <p className="text-slate-500 font-medium line-through decoration-slate-400">{todo.text}</p>
                            <span className="text-[10px] text-slate-400 font-semibold mt-0.5 inline-block">
                                {todo.category}
                            </span>
                        </div>
                        <button 
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                 ))}
              </div>
              {/* <button 
                 onClick={() => setTodos(todos.filter(t => !t.completed))}
                 className="mt-4 text-xs font-semibold text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
              >
                 <Trash2 size={12} /> Bersihkan yang selesai
              </button> */}
            </div>
          )}
        </div>}
      </div>
    );
}