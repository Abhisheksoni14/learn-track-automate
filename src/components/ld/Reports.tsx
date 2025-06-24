
import { ArrowLeft, BarChart3, Download, Filter } from 'lucide-react';

interface ReportsProps {
  onBack: () => void;
}

export const Reports = ({ onBack }: ReportsProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Training Reports</h2>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Training Requests</h3>
              <p className="text-sm text-gray-600 mt-1">Request statistics and trends</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Training Schedule</h3>
              <p className="text-sm text-gray-600 mt-1">Scheduled sessions report</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Attendance</h3>
              <p className="text-sm text-gray-600 mt-1">Completion and attendance</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Feedback Analysis</h3>
              <p className="text-sm text-gray-600 mt-1">Training effectiveness</p>
            </div>
            <BarChart3 className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Sample Report Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Training Requests Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Requests (Last 30 Days)</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-gray-900">Total Requests</span>
              <span className="text-2xl font-bold text-blue-600">45</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-gray-900">Approved</span>
              <span className="text-2xl font-bold text-green-600">32</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium text-gray-900">Pending</span>
              <span className="text-2xl font-bold text-yellow-600">8</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="font-medium text-gray-900">Rejected</span>
              <span className="text-2xl font-bold text-red-600">5</span>
            </div>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Requests by Department</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Engineering</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-sm font-medium">18</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Design</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <span className="text-sm font-medium">12</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Management</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <span className="text-sm font-medium">8</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-900">Marketing</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <span className="text-sm font-medium">7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Training Completion Stats</h3>
          <div className="space-y-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">94%</div>
              <div className="text-sm text-gray-600">Overall Completion Rate</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">156</div>
                <div className="text-xs text-gray-600">Completed Sessions</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">4.6</div>
                <div className="text-xs text-gray-600">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Training Topics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Requested Topics</h3>
          <div className="space-y-3">
            {[
              { topic: 'React/Frontend Development', count: 12 },
              { topic: 'Leadership Skills', count: 9 },
              { topic: 'Data Science & Analytics', count: 8 },
              { topic: 'DevOps & Cloud', count: 7 },
              { topic: 'UI/UX Design', count: 6 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{item.topic}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
                  {item.count} requests
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
