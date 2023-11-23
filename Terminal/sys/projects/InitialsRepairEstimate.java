/**
 * Author: Matthew Butler
 * Date: 3/19/2023
 * Assignment: InitialsRepairEstimate.java
 * Description: Calculates repair estimates for Henderson's Repair Service
 */

import java.util.ArrayList;
import java.util.Scanner;

public class InitialsRepairEstimate {

    // Constants
    private static final double LABOR_RATE = 43.50;
    private static final double TRAVEL_RATE = 9.25;
    private static final double DISCOUNT_RATE = 0.125;
    private static final double TAX_RATE = 0.0825;
    private static final double MAX_TRAVEL_TIME = 2.0;

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        // Get job name from user
        System.out.print("Enter job name: ");
        String jobName = input.nextLine();

        // Get itemized list of materials and their costs
        ArrayList<Material> materials = new ArrayList<>();
        while (true) {
            System.out.print("Enter material name (or 'done' to finish): ");
            String materialName = input.nextLine();
            if (materialName.equalsIgnoreCase("done")) {
                break;
            }
            System.out.print("Enter quantity: ");
            int quantity = input.nextInt();
            System.out.print("Enter price per unit: $");
            double price = input.nextDouble();
            input.nextLine();
            materials.add(new Material(materialName, quantity, price));
        }

        // Get estimated labor time and travel time from user
        System.out.print("Enter estimated labor time (in hours): ");
        double laborTime = input.nextDouble();
        System.out.print("Enter estimated travel time (in hours): ");
        double travelTime = input.nextDouble();
        input.nextLine();

        // Compute estimate
        double materialsCost = 0;
        for (Material material : materials) {
            materialsCost += material.getCost();
        }
        double laborCost = laborTime * LABOR_RATE;
        double travelCost = (travelTime > MAX_TRAVEL_TIME) ? 0 : (travelTime * TRAVEL_RATE);
        double subtotal = materialsCost + laborCost + travelCost;
        double discount = (subtotal > 0 && isVeteran()) ? (subtotal * DISCOUNT_RATE) : 0;
        double tax = subtotal * TAX_RATE;
        double total = subtotal + tax - discount;

        // Print estimate
        System.out.println("Henderson's Repair Service");
        System.out.println("Job: " + jobName);
        System.out.println("Materials:");
        for (Material material : materials) {
            System.out.printf("%s x%d $%.2f\n", material.getName(), material.getQuantity(), material.getPrice());
        }
        System.out.printf("Labor: %.1f hours @ $%.2f/hr $%.2f\n", laborTime, LABOR_RATE, laborCost);
        if (travelTime > MAX_TRAVEL_TIME) {
            System.out.println("Travel: Distance is too far");
        } else {
            System.out.printf("Travel: %.1f hours @ $%.2f/hr $%.2f\n", travelTime, TRAVEL_RATE, travelCost);
        }
        System.out.printf("Subtotal: $%.2f\n", subtotal);
        if (discount > 0) {
            System.out.printf("Veteran's Discount: $%.2f\n", discount);
        }
        System.out.printf("Tax: $%.2f\n", tax);
        System.out.printf("Total Estimate: $%.2f\n", total);
    }

    private static boolean isVeteran() {
        Scanner input = new Scanner(System.in);
        // Prompt the user to enter whether they are a veteran (Y/N)
        System.out.print("Are you a veteran (Y/N)? ");
        String answer = input.nextLine();
        return (answer.equalsIgnoreCase("Y"));
    }

    private static class Material {
        // Declare private fields for the name, quantity, and price per unit of the material
        private String name;
        private int quantity;
        private double price;

        // Define a constructor that initializes the fields with the given values
        public Material(String name, int quantity, double price) {
            this.name = name;
            this.quantity = quantity;
            this.price = price;
        }

        // Define getter methods for the name, quantity, and price of the material
        public String getName() {
            return name;
        }

        public int getQuantity() {
            return quantity;
        }

        public double getPrice() {
            return price;
        }

        // Define a method that computes and returns the total cost of the material
        public double getCost() {
            return quantity * price;
        }
    }
}