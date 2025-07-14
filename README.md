# Mining Pool Dashboard

A modern, responsive dashboard for monitoring and managing cryptocurrency mining pools. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 📊 **Real-time Mining Statistics** - Monitor hashrate, active workers, and reject rates
- 🟢 **Pool Status Monitoring** - Color-coded status indicators (online, degraded, offline)
- 🔍 **Interactive Pool Details** - Modal dialogs with detailed pool information
- 📈 **Advanced Filtering & Sorting** - Filter by status, sort by hashrate, workers, or name
- 🌙 **Dark/Light Theme Support** - Toggle between themes with persistent preference
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance** - Optimized with Next.js App Router and modern React patterns

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Testing**: Jest + React Testing Library
- **Containerization**: Docker

## Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm

### Development

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd mining-pool-dashboard
pnpm install
```

2. **Start development server:**
```bash
pnpm dev
```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser

### Production with Docker

1. **Build the Docker image:**
```bash
docker build -t mining-pool-dashboard .
```

2. **Run the container:**
```bash
docker run -p 3000:3000 mining-pool-dashboard
```

3. **Access the application** at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
mining-pool-dashboard/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── __tests__/        # Component tests
│   └── ...               # Feature components
├── styles/               # Global styles
├── utils/                # Utility functions
└── Dockerfile           # Production container
```

## Testing

Run the test suite:
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test:watch
```

## API Endpoints

- `GET /api/mining-pools` - Fetch all mining pools
- `GET /api/mining-pools/[id]` - Fetch specific pool details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details