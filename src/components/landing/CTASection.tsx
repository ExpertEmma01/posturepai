import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl rounded-2xl gradient-hero p-12 text-center shadow-elevated"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary-foreground">
            Start Improving Your Posture Today
          </h2>
          <p className="mb-8 text-primary-foreground/80">
            Join thousands of remote workers who are protecting their health with AI-powered ergonomic coaching.
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="gap-2 px-8 shadow-elevated">
              Launch Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
