import { useState } from 'react';
import { BookOpen, Search, Plus, Edit, Trash2, Users } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Course</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  placeholder="Enter course title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={newCourse.category} onValueChange={(value) => setNewCourse({...newCourse, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Management">Management</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor *</Label>
                <Input
                  id="instructor"
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                  placeholder="Enter instructor name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  placeholder="e.g., 20 hours, 3 days"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  placeholder="Enter course description (optional)"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newCourse.status} onValueChange={(value: 'Draft' | 'Published') => setNewCourse({...newCourse, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsAddDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleAddCourse}>
                Add Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-3">Category: {course.category}</p>
            <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
            <p className="text-sm text-gray-600 mb-3">Duration: {course.duration}</p>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <Users className="w-4 h-4" />
                <span>{course.enrollments} enrolled</span>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                course.status === 'Published' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {course.status}
              </span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Created: {course.createdDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
