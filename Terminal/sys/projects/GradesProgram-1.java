import java.util.Arrays;
import java.util.Scanner;

public class GradesProgram {

    static final int MAX_GRADE = 100;
    static final int MIN_GRADE = 0;
    static final int GRADES_COUNT = 15;

    static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        boolean repeat = true;
        while (repeat) {
            int[] grades = readGrades();
            System.out.println("All grades: " + Arrays.toString(grades));
            System.out.println("Average grade: " + calculateAverage(grades));
            System.out.println("Grades below 70: " + Arrays.toString(getGradesBelow(grades, 70)));
            System.out.println("Highest grade: " + getHighestGrade(grades));
            System.out.println("Lowest grade: " + getLowestGrade(grades));
            repeat = askForRepetition();
        }
    }

    static int[] readGrades() {
        int[] grades = new int[GRADES_COUNT];
        for (int i = 0; i < GRADES_COUNT; i++) {
            System.out.print("Enter grade #" + (i+1) + ": ");
            int grade = scanner.nextInt();
            if (grade < MIN_GRADE || grade > MAX_GRADE) {
                System.out.println("Invalid grade. Please enter a value between 0 and 100.");
                i--;
            } else {
                grades[i] = grade;
            }
        }
        return grades;
    }

    static double calculateAverage(int[] grades) {
        int sum = 0;
        for (int grade : grades) {
            sum += grade;
        }
        return (double) sum / grades.length;
    }

    static int[] getGradesBelow(int[] grades, int limit) {
        int[] belowLimit = new int[grades.length];
        int count = 0;
        for (int grade : grades) {
            if (grade < limit) {
                belowLimit[count] = grade;
                count++;
            }
        }
        return Arrays.copyOfRange(belowLimit, 0, count);
    }

    static int getHighestGrade(int[] grades) {
        Arrays.sort(grades);
        return grades[grades.length-1];
    }

    static int getLowestGrade(int[] grades) {
        Arrays.sort(grades);
        return grades[0];
    }

    static boolean askForRepetition() {
        System.out.print("\n Do you want to enter another set of grades? (y/n) ");
        String answer = scanner.next();
        return answer.equalsIgnoreCase("y");
    }

}