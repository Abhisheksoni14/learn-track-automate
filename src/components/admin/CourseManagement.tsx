
import { useState } from 'react';
import { BookOpen, Search, Plus, Edit, Trash2, Users, Sparkles, GraduationCap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  enrollments: number;
  status: 'Published' | 'Draft';
  createdDate: string;
  description?: string;
}

export const CourseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: '',
    instructor: '',
    duration: '',
    description: '',
    status: 'Draft' as 'Draft' | 'Published'
  });
  const { toast } = useToast();

  const [courses, setCourses] = useState<Course[]>([
    { 
      id: 1, 
      title: 'Data Science Fundamentals', 
      category: 'Technology', 
      instructor: 'Dr. Smith', 
      duration: '40 hours',
      enrollments: 125,
      status: 'Published',
      createdDate: '2024-01-10'
    },
    { 
      id: 2, 
      title: 'Leadership Excellence', 
      category: 'Management', 
      instructor: 'Jane Wilson', 
      duration: '20 hours',
      enrollments: 89,
      status: 'Draft',
      createdDate: '2024-01-08'
    },
    { 
      id: 3, 
      title: 'Digital Marketing Strategy', 
      category: 'Marketing', 
      instructor: 'Mike Johnson', 
      duration: '30 hours',
      enrollments: 156,
      status: 'Published',
      createdDate: '2024-01-05'
    },
  ]);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.category || !newCourse.instructor || !newCourse.duration) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const course: Course = {
      id: Math.max(...courses.map(c => c.id)) + 1,
      title: newCourse.title,
      category: newCourse.category,
      instructor: newCourse.instructor,
      duration: newCourse.duration,
      enrollments: 0,
      status: newCourse.status,
      createdDate: new Date().toISOString().split('T')[0],
      description: newCourse.description
    };

    setCourses([course, ...courses]);
    setNewCourse({
      title: '',
      category: '',
      instructor: '',
      duration: '',
      description: '',
      status: 'Draft'
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Course added successfully!",
    });
  };

  const resetForm = () => {
    setNewCourse({
      title: '',
      category: '',
      instructor: '',
      duration: '',
      description: '',
      status: 'Draft'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Course Management</h1>
                <p className="text-purple-100">Manage and organize your training courses</p>
              </div>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add Course</span>
                  <Sparkles className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Add New Course</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold text-slate-700">Course Title *</Label>
                    <Input
                      id="title"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                      placeholder="Enter course title"
                      className="modern-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-semibold text-slate-700">Category *</Label>
                    <Select value={newCourse.category} onValueChange={(value) => setNewCourse({...newCourse, category: value})}>
                      <SelectTrigger className="modern-input">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-xl border-0 shadow-xl rounded-xl">
                        <SelectItem value="Technology">🚀 Technology</SelectItem>
                        <SelectItem value="Management">👥 Management</SelectItem>
                        <SelectItem value="Marketing">📈 Marketing</SelectItem>
                        <SelectItem value="Sales">💼 Sales</SelectItem>
                        <SelectItem value="HR">🤝 Human Resources</SelectItem>
                        <SelectItem value="Finance">💰 Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor" className="text-sm font-semibold text-slate-700">Instructor *</Label>
                    <Input
                      id="instructor"
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                      placeholder="Enter instructor name"
                      className="modern-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-sm font-semibold text-slate-700">Duration *</Label>
                    <Input
                      id="duration"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                      placeholder="e.g., 20 hours, 3 days"
                      className="modern-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold text-slate-700">Description</Label>
                    <Textarea
                      id="description"
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                      placeholder="Enter course description (optional)"
                      rows={3}
                      className="modern-input resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-semibold text-slate-700">Status</Label>
                    <Select value={newCourse.status} onValueChange={(value: 'Draft' | 'Published') => setNewCourse({...newCourse, status: value})}>
                      <SelectTrigger className="modern-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-xl border-0 shadow-xl rounded-xl">
                        <SelectItem value="Draft">📝 Draft</SelectItem>
                        <SelectItem value="Published">✅ Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setIsAddDialogOpen(false);
                    }}
                    className="px-6 py-3 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddCourse} className="modern-button">
                    Add Course
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search Section */}
        <div className="modern-card p-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Search courses by title, category, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200 text-slate-700 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="group modern-card p-6 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="flex space-x-2">
                  <button className="w-9 h-9 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-110">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200 hover:scale-110">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors duration-200">{course.title}</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full mr-2"></span>
                  Category: <span className="font-semibold ml-1">{course.category}</span>
                </p>
                <p className="text-sm text-slate-600 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mr-2"></span>
                  Instructor: <span className="font-semibold ml-1">{course.instructor}</span>
                </p>
                <p className="text-sm text-slate-600 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mr-2"></span>
                  Duration: <span className="font-semibold ml-1">{course.duration}</span>
                </p>
              </div>
              
              <div className="flex items-center justify-between text-sm mb-4">
                <div className="flex items-center space-x-2 text-slate-600 bg-slate-100 px-3 py-2 rounded-xl">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold">{course.enrollments}</span>
                  <span>enrolled</span>
                </div>
                <span className={`px-3 py-2 text-xs font-bold rounded-xl ${
                  course.status === 'Published' 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/25' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                }`}>
                  {course.status === 'Published' ? '✅ Published' : '📝 Draft'}
                </span>
              </div>
              
              <div className="pt-4 border-t border-gradient-to-r from-purple-200 to-violet-200">
                <p className="text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
                  Created: {course.createdDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
